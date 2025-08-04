import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '../../../../auth/infrastructure/guard/ws-auth.guard';
// Temporarily commented out due to TypeScript module resolution issues
// import { WorkshopService } from '../../../workshop/application/usecase/workshop.service';
// import { SessionActivityService } from '../../../workshop/application/usecase/session-activity.service';

interface WorkshopRoom {
  workshopId: string;
  sessionId?: string;
  participants: Map<string, ParticipantInfo>;
  activities: Map<string, ActivityState>;
  chat: ChatMessage[];
  polls: Map<string, PollState>;
  breakoutRooms: Map<string, BreakoutRoom>;
}

interface ParticipantInfo {
  userId: string;
  userName: string;
  role: 'instructor' | 'participant' | 'assistant';
  teamId?: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  joinedAt: Date;
  connectionId: string;
}

interface ActivityState {
  activityId: string;
  status: 'pending' | 'active' | 'completed';
  participants: Set<string>;
  submissions: Map<string, any>;
  startTime?: Date;
  timeRemaining?: number;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  isInstructor: boolean;
  reactions: Map<string, string[]>;
}

interface PollState {
  id: string;
  question: string;
  options: string[];
  votes: Map<string, number>;
  voters: Set<string>;
  isAnonymous: boolean;
  showResults: boolean;
  createdBy: string;
  createdAt: Date;
}

interface BreakoutRoom {
  id: string;
  name: string;
  participants: Set<string>;
  maxSize: number;
  purpose: string;
  duration: number;
  startTime: Date;
}

@WebSocketGateway({
  namespace: '/workshop',
  cors: {
    origin: '*',
    credentials: true,
  },
})
@UseGuards(WsAuthGuard)
export class WorkshopGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private rooms = new Map<string, WorkshopRoom>();
  private userConnections = new Map<string, Set<string>>(); // userId -> connectionIds

  constructor(
    // private readonly workshopService: WorkshopService,
    // private readonly activityService: SessionActivityService,
  ) {}

  async handleConnection(client: Socket) {
    const userId = client.data.userId;
    console.log(`Workshop client connected: ${client.id}, userId: ${userId}`);

    // Track user connections
    if (!this.userConnections.has(userId)) {
      this.userConnections.set(userId, new Set());
    }
    this.userConnections.get(userId)!.add(client.id);
  }

  async handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    console.log(`Workshop client disconnected: ${client.id}, userId: ${userId}`);

    // Remove from user connections
    const connections = this.userConnections.get(userId);
    if (connections) {
      connections.delete(client.id);
      if (connections.size === 0) {
        this.userConnections.delete(userId);
      }
    }

    // Remove from all rooms
    this.rooms.forEach((room, roomId) => {
      const participant = Array.from(room.participants.values())
        .find(p => p.connectionId === client.id);
      
      if (participant) {
        room.participants.delete(participant.userId);
        
        // Notify others
        client.to(roomId).emit('participant:left', {
          userId: participant.userId,
          userName: participant.userName,
          timestamp: new Date(),
        });

        // Update participant count
        this.server.to(roomId).emit('room:stats', {
          participantCount: room.participants.size,
          participants: Array.from(room.participants.values()),
        });
      }
    });
  }

  @SubscribeMessage('session:join')
  async handleJoinSession(
    @MessageBody() data: { sessionId: string; userName: string; role?: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId, userName, role = 'participant' } = data;

      // Verify user can join session
      // await this.workshopService.joinSession(userId, sessionId);

      // Get or create room
      const roomId = `session:${sessionId}`;
      if (!this.rooms.has(roomId)) {
        this.rooms.set(roomId, {
          workshopId: '', // Would be fetched from session
          sessionId,
          participants: new Map(),
          activities: new Map(),
          chat: [],
          polls: new Map(),
          breakoutRooms: new Map(),
        });
      }

      const room = this.rooms.get(roomId)!;

      // Add participant
      const participant: ParticipantInfo = {
        userId,
        userName,
        role: role as any,
        isAudioEnabled: false,
        isVideoEnabled: false,
        joinedAt: new Date(),
        connectionId: client.id,
      };
      room.participants.set(userId, participant);

      // Join socket room
      client.join(roomId);

      // Send room state to joining participant
      client.emit('session:joined', {
        sessionId,
        participants: Array.from(room.participants.values()),
        activities: Array.from(room.activities.values()),
        chat: room.chat.slice(-50), // Last 50 messages
        polls: Array.from(room.polls.values()),
      });

      // Notify others
      client.to(roomId).emit('participant:joined', {
        participant,
        timestamp: new Date(),
      });

      // Update room stats
      this.server.to(roomId).emit('room:stats', {
        participantCount: room.participants.size,
        participants: Array.from(room.participants.values()),
      });

      return { success: true, roomId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('session:leave')
  async handleLeaveSession(
    @MessageBody() data: { sessionId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (room && room.participants.has(userId)) {
      const participant = room.participants.get(userId)!;
      room.participants.delete(userId);
      
      client.leave(roomId);
      
      // Notify others
      client.to(roomId).emit('participant:left', {
        userId,
        userName: participant.userName,
        timestamp: new Date(),
      });

      // Update room stats
      this.server.to(roomId).emit('room:stats', {
        participantCount: room.participants.size,
        participants: Array.from(room.participants.values()),
      });
    }

    return { success: true };
  }

  @SubscribeMessage('chat:send')
  async handleChatMessage(
    @MessageBody() data: { sessionId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    const participant = room.participants.get(userId)!;
    const chatMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      userName: participant.userName,
      message: data.message,
      timestamp: new Date(),
      isInstructor: participant.role === 'instructor',
      reactions: new Map(),
    };

    room.chat.push(chatMessage);

    // Broadcast to all in room
    this.server.to(roomId).emit('chat:message', chatMessage);

    return { success: true, messageId: chatMessage.id };
  }

  @SubscribeMessage('chat:react')
  async handleChatReaction(
    @MessageBody() data: { sessionId: string; messageId: string; reaction: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    const message = room.chat.find(m => m.id === data.messageId);
    if (!message) {
      return { success: false, error: 'Message not found' };
    }

    // Toggle reaction
    const userReactions = message.reactions.get(data.reaction) || [];
    const index = userReactions.indexOf(userId);
    if (index === -1) {
      userReactions.push(userId);
    } else {
      userReactions.splice(index, 1);
    }
    
    if (userReactions.length > 0) {
      message.reactions.set(data.reaction, userReactions);
    } else {
      message.reactions.delete(data.reaction);
    }

    // Broadcast update
    this.server.to(roomId).emit('chat:reaction', {
      messageId: data.messageId,
      reactions: Object.fromEntries(message.reactions),
    });

    return { success: true };
  }

  @SubscribeMessage('activity:join')
  async handleJoinActivity(
    @MessageBody() data: { sessionId: string; activityId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    let activity = room.activities.get(data.activityId);
    if (!activity) {
      activity = {
        activityId: data.activityId,
        status: 'active',
        participants: new Set(),
        submissions: new Map(),
        startTime: new Date(),
      };
      room.activities.set(data.activityId, activity);
    }

    activity.participants.add(userId);

    // Notify activity join
    this.server.to(roomId).emit('activity:participant:joined', {
      activityId: data.activityId,
      userId,
      participantCount: activity.participants.size,
    });

    return { success: true };
  }

  @SubscribeMessage('activity:submit')
  async handleActivitySubmission(
    @MessageBody() data: { sessionId: string; activityId: string; response: any },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    const activity = room.activities.get(data.activityId);
    if (!activity || activity.status !== 'active') {
      return { success: false, error: 'Activity not active' };
    }

    // Submit to backend
    try {
      // await this.workshopService.submitActivityResponse(userId, data.activityId, {
      //   response: data.response,
      // });

      activity.submissions.set(userId, data.response);

      // Notify submission
      this.server.to(roomId).emit('activity:submission', {
        activityId: data.activityId,
        userId,
        submissionCount: activity.submissions.size,
        participantCount: activity.participants.size,
      });

      // Send live leaderboard update if applicable
      // const leaderboard = await this.activityService.getActivityLeaderboard(data.activityId);
      // this.server.to(roomId).emit('activity:leaderboard', {
      //   activityId: data.activityId,
      //   leaderboard,
      // });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Submission failed' };
    }
  }

  @SubscribeMessage('poll:create')
  async handleCreatePoll(
    @MessageBody() data: {
      sessionId: string;
      question: string;
      options: string[];
      isAnonymous?: boolean;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    const participant = room.participants.get(userId)!;
    if (participant.role !== 'instructor' && participant.role !== 'assistant') {
      return { success: false, error: 'Only instructors can create polls' };
    }

    const poll: PollState = {
      id: `poll-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: data.question,
      options: data.options,
      votes: new Map(data.options.map(opt => [opt, 0])),
      voters: new Set(),
      isAnonymous: data.isAnonymous || false,
      showResults: false,
      createdBy: userId,
      createdAt: new Date(),
    };

    room.polls.set(poll.id, poll);

    // Broadcast new poll
    this.server.to(roomId).emit('poll:created', poll);

    return { success: true, pollId: poll.id };
  }

  @SubscribeMessage('poll:vote')
  async handlePollVote(
    @MessageBody() data: { sessionId: string; pollId: string; option: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    const poll = room.polls.get(data.pollId);
    if (!poll) {
      return { success: false, error: 'Poll not found' };
    }

    if (poll.voters.has(userId)) {
      return { success: false, error: 'Already voted' };
    }

    // Record vote
    poll.voters.add(userId);
    const currentVotes = poll.votes.get(data.option) || 0;
    poll.votes.set(data.option, currentVotes + 1);

    // Broadcast update
    const results = poll.showResults ? {
      votes: Object.fromEntries(poll.votes),
      totalVotes: poll.voters.size,
    } : {
      totalVotes: poll.voters.size,
    };

    this.server.to(roomId).emit('poll:update', {
      pollId: data.pollId,
      ...results,
    });

    return { success: true };
  }

  @SubscribeMessage('poll:showResults')
  async handleShowPollResults(
    @MessageBody() data: { sessionId: string; pollId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    const participant = room.participants.get(userId)!;
    if (participant.role !== 'instructor' && participant.role !== 'assistant') {
      return { success: false, error: 'Only instructors can show results' };
    }

    const poll = room.polls.get(data.pollId);
    if (!poll) {
      return { success: false, error: 'Poll not found' };
    }

    poll.showResults = true;

    // Broadcast results
    this.server.to(roomId).emit('poll:results', {
      pollId: data.pollId,
      votes: Object.fromEntries(poll.votes),
      totalVotes: poll.voters.size,
    });

    return { success: true };
  }

  @SubscribeMessage('breakout:create')
  async handleCreateBreakoutRoom(
    @MessageBody() data: {
      sessionId: string;
      name: string;
      maxSize: number;
      purpose: string;
      duration: number;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    const participant = room.participants.get(userId)!;
    if (participant.role !== 'instructor' && participant.role !== 'assistant') {
      return { success: false, error: 'Only instructors can create breakout rooms' };
    }

    const breakoutRoom: BreakoutRoom = {
      id: `breakout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: data.name,
      participants: new Set(),
      maxSize: data.maxSize,
      purpose: data.purpose,
      duration: data.duration,
      startTime: new Date(),
    };

    room.breakoutRooms.set(breakoutRoom.id, breakoutRoom);

    // Broadcast new breakout room
    this.server.to(roomId).emit('breakout:created', breakoutRoom);

    return { success: true, breakoutRoomId: breakoutRoom.id };
  }

  @SubscribeMessage('breakout:join')
  async handleJoinBreakoutRoom(
    @MessageBody() data: { sessionId: string; breakoutRoomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    const breakoutRoom = room.breakoutRooms.get(data.breakoutRoomId);
    if (!breakoutRoom) {
      return { success: false, error: 'Breakout room not found' };
    }

    if (breakoutRoom.participants.size >= breakoutRoom.maxSize) {
      return { success: false, error: 'Breakout room is full' };
    }

    // Remove from other breakout rooms
    room.breakoutRooms.forEach(br => {
      br.participants.delete(userId);
    });

    // Join new breakout room
    breakoutRoom.participants.add(userId);
    const breakoutRoomId = `breakout:${data.breakoutRoomId}`;
    client.join(breakoutRoomId);

    // Notify breakout room members
    this.server.to(breakoutRoomId).emit('breakout:member:joined', {
      userId,
      userName: room.participants.get(userId)!.userName,
    });

    // Update main room
    this.server.to(roomId).emit('breakout:update', {
      breakoutRoomId: data.breakoutRoomId,
      participants: Array.from(breakoutRoom.participants),
    });

    return { success: true };
  }

  @SubscribeMessage('media:toggle')
  async handleMediaToggle(
    @MessageBody() data: {
      sessionId: string;
      mediaType: 'audio' | 'video';
      enabled: boolean;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    const participant = room.participants.get(userId)!;
    if (data.mediaType === 'audio') {
      participant.isAudioEnabled = data.enabled;
    } else {
      participant.isVideoEnabled = data.enabled;
    }

    // Broadcast media state change
    this.server.to(roomId).emit('media:update', {
      userId,
      mediaType: data.mediaType,
      enabled: data.enabled,
    });

    return { success: true };
  }

  @SubscribeMessage('instructor:mute')
  async handleInstructorMute(
    @MessageBody() data: { sessionId: string; targetUserId: string; mediaType: 'audio' | 'video' },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const roomId = `session:${data.sessionId}`;
    const room = this.rooms.get(roomId);

    if (!room || !room.participants.has(userId)) {
      return { success: false, error: 'Not in session' };
    }

    const participant = room.participants.get(userId)!;
    if (participant.role !== 'instructor') {
      return { success: false, error: 'Only instructors can mute participants' };
    }

    // Send mute command to target user
    const targetConnections = this.userConnections.get(data.targetUserId);
    if (targetConnections) {
      targetConnections.forEach(connectionId => {
        this.server.to(connectionId).emit('instructor:muted', {
          mediaType: data.mediaType,
        });
      });
    }

    return { success: true };
  }
}