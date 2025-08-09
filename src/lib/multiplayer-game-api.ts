import io from 'socket.io-client';

export interface GameRoom {
  id: string;
  hostPlayerId: string;
  guestPlayerId?: string;
  mode: 'pvp' | 'pve';
  status: 'waiting' | 'playing' | 'completed' | 'abandoned';
  phase: 'mulligan' | 'main' | 'combat' | 'end' | 'gameOver';
  currentTurn: string;
  turnNumber: number;
  turnTimer?: number;
  gameState: any;
  gameSettings?: {
    maxTurnTime: number;
    deckSize: number;
    maxHandSize: number;
  };
  winnerId?: string;
  winCondition?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface PlayerStats {
  id: string;
  userId: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  wins: number;
  losses: number;
  draws: number;
  totalGames: number;
  winRate: number;
  currentRank: string;
  rankPoints: number;
  currency: {
    coins: number;
    gems: number;
  };
  unlockedPatterns: string[];
  achievements: string[];
  statistics?: {
    totalDamageDealt: number;
    totalHealingDone: number;
    cardsPlayed: number;
    abilitiesUsed: number;
    longestWinStreak: number;
    currentWinStreak: number;
    favoritePattern?: string;
  };
  lastActiveAt: Date;
}

export interface GameAction {
  actionType: 'play_card' | 'attack' | 'use_ability' | 'end_turn' | 'surrender';
  actionData?: {
    cardId?: string;
    targetId?: string;
    fromPosition?: number;
    toPosition?: number;
    abilityIndex?: number;
    [key: string]: any;
  };
}

export interface CreateGameRoomRequest {
  mode: 'pvp' | 'pve';
  gameSettings?: {
    maxTurnTime: number;
    deckSize: number;
    maxHandSize: number;
  };
}

export class MultiplayerGameAPI {
  private socket: ReturnType<typeof io> | null = null;
  private userId: string | null = null;
  private connected = false;

  // Event listeners
  private eventListeners: { [event: string]: Function[] } = {};

  constructor() {
    this.initializeSocket();
  }

  private initializeSocket() {
    // Connect to the Next.js proxy server, which will handle WebSocket proxying
    const frontendUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3002';
    
    this.socket = io(frontendUrl, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
      withCredentials: true, // This enables sending cookies
    } as any);

    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to game server');
      this.connected = true;
      this.emit('connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from game server');
      this.connected = false;
      this.emit('disconnected');
    });

    this.socket.on('game_created', (data) => {
      this.emit('game_created', data);
    });

    this.socket.on('game_started', (data) => {
      this.emit('game_started', data);
    });

    this.socket.on('game_action_result', (data) => {
      this.emit('game_action_result', data);
    });

    this.socket.on('game_ended', (data) => {
      this.emit('game_ended', data);
    });

    this.socket.on('player_left', (data) => {
      this.emit('player_left', data);
    });

    this.socket.on('game_no_longer_available', (data) => {
      this.emit('game_no_longer_available', data);
    });

    this.socket.on('backend_disconnected', (data) => {
      console.warn('Backend connection lost:', data);
      this.emit('backend_disconnected', data);
    });

    this.socket.on('backend_error', (data) => {
      console.error('Backend error:', data);
      this.emit('backend_error', data);
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      this.emit('error', error);
    });
  }

  // Event management
  on(event: string, callback: Function) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  off(event: string, callback?: Function) {
    if (!this.eventListeners[event]) return;
    
    if (callback) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    } else {
      this.eventListeners[event] = [];
    }
  }

  private emit(event: string, data?: any) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
  }

  // Connection management
  connect(userId: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.connected && this.userId === userId) {
        resolve(true);
        return;
      }

      this.userId = userId;
      
      if (this.socket) {
        (this.socket as any).auth = { userId };
        this.socket.connect();

        const timeout = setTimeout(() => {
          resolve(false);
        }, 5000);

        this.socket.once('connect', () => {
          clearTimeout(timeout);
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.connected = false;
    this.userId = null;
  }

  isConnected(): boolean {
    return this.connected;
  }

  // Game room operations
  async createGameRoom(request: CreateGameRoomRequest): Promise<{ success: boolean; gameRoom?: GameRoom; error?: string }> {
    return new Promise((resolve) => {
      if (!this.socket || !this.connected) {
        resolve({ success: false, error: 'Not connected to server' });
        return;
      }

      this.socket.emit('create_game', request, (response: any) => {
        resolve(response);
      });
    });
  }

  async joinGameRoom(gameRoomId: string): Promise<{ success: boolean; gameRoom?: GameRoom; error?: string }> {
    return new Promise((resolve) => {
      if (!this.socket || !this.connected) {
        resolve({ success: false, error: 'Not connected to server' });
        return;
      }

      this.socket.emit('join_game', { gameRoomId }, (response: any) => {
        resolve(response);
      });
    });
  }

  async leaveGameRoom(gameRoomId: string): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      if (!this.socket || !this.connected) {
        resolve({ success: false, error: 'Not connected to server' });
        return;
      }

      this.socket.emit('leave_game', { gameRoomId }, (response: any) => {
        resolve(response);
      });
    });
  }

  async executeGameAction(gameRoomId: string, action: GameAction): Promise<{ success: boolean; gameState?: any; error?: string }> {
    return new Promise((resolve) => {
      if (!this.socket || !this.connected) {
        resolve({ success: false, error: 'Not connected to server' });
        return;
      }

      this.socket.emit('game_action', { gameRoomId, action }, (response: any) => {
        resolve(response);
      });
    });
  }

  async getAvailableGames(): Promise<{ success: boolean; games?: GameRoom[]; error?: string }> {
    return new Promise((resolve) => {
      if (!this.socket || !this.connected) {
        resolve({ success: false, error: 'Not connected to server' });
        return;
      }

      this.socket.emit('get_available_games', (response: any) => {
        resolve(response);
      });
    });
  }

  async getPlayerStats(): Promise<{ success: boolean; stats?: PlayerStats; error?: string }> {
    return new Promise((resolve) => {
      if (!this.socket || !this.connected) {
        resolve({ success: false, error: 'Not connected to server' });
        return;
      }

      this.socket.emit('get_player_stats', (response: any) => {
        resolve(response);
      });
    });
  }

  // REST API fallback methods
  async createGameRoomRest(request: CreateGameRoomRequest): Promise<GameRoom> {
    const response = await fetch('/api/backend/pattern-game/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': this.userId || 'anonymous',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create game room: ${response.statusText}`);
    }

    return response.json();
  }

  async getAvailableGamesRest(): Promise<GameRoom[]> {
    const response = await fetch('/api/backend/pattern-game/rooms/available', {
      headers: {
        'X-User-Id': this.userId || 'anonymous',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get available games: ${response.statusText}`);
    }

    return response.json();
  }

  async getPlayerStatsRest(): Promise<PlayerStats> {
    const response = await fetch('/api/backend/pattern-game/stats', {
      headers: {
        'X-User-Id': this.userId || 'anonymous',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get player stats: ${response.statusText}`);
    }

    return response.json();
  }

  async getActiveGames(): Promise<{ success: boolean; games?: GameRoom[]; error?: string }> {
    try {
      const response = await fetch('/api/backend/pattern-game/rooms/my-active', {
        headers: {
          'X-User-Id': this.userId || 'anonymous',
        },
      });

      if (!response.ok) {
        return { success: false, error: `Failed to get active games: ${response.statusText}` };
      }

      const games = await response.json();
      return { success: true, games };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}

// Singleton instance
export const multiplayerGameAPI = new MultiplayerGameAPI();