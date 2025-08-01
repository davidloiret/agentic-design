'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { HearthstoneGameHub } from './HearthstoneGameHub';
import { multiplayerGameAPI, GameRoom, PlayerStats, GameAction, CreateGameRoomRequest } from '@/lib/multiplayer-game-api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Swords, Package, User, LogOut, 
  Coins, Gem, Lock, CheckCircle, Star, Wifi, WifiOff,
  Users, Play, Eye, Clock, Crown
} from 'lucide-react';

type GameMode = 'menu' | 'singleplayer' | 'multiplayer_lobby' | 'multiplayer_game' | 'create_room' | 'join_room';

interface GameLobbyState {
  availableRooms: GameRoom[];
  activeGames: GameRoom[];
  currentRoom: GameRoom | null;
  playerStats: PlayerStats | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
}

export const MultiplayerPatternCardGame: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [lobbyState, setLobbyState] = useState<GameLobbyState>({
    availableRooms: [],
    activeGames: [],
    currentRoom: null,
    playerStats: null,
    connectionStatus: 'disconnected'
  });
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Initialize user ID and connect to multiplayer server
  useEffect(() => {
    const savedUserId = localStorage.getItem('pattern-game-user-id');
    const savedPlayerName = localStorage.getItem('pattern-game-player-name');
    
    if (savedUserId && savedPlayerName) {
      setUserId(savedUserId);
      setPlayerName(savedPlayerName);
      connectToMultiplayer(savedUserId);
    } else {
      setShowNameInput(true);
    }
  }, []);

  const connectToMultiplayer = useCallback(async (userId: string) => {
    setLobbyState(prev => ({ ...prev, connectionStatus: 'connecting' }));
    
    try {
      const connected = await multiplayerGameAPI.connect(userId);
      
      if (connected) {
        setLobbyState(prev => ({ ...prev, connectionStatus: 'connected' }));
        
        // Load player stats
        const statsResponse = await multiplayerGameAPI.getPlayerStats();
        if (statsResponse.success && statsResponse.stats) {
          setLobbyState(prev => ({ ...prev, playerStats: statsResponse.stats || null }));
        }
        
        // Load available rooms and active games
        await refreshAvailableRooms();
        await refreshActiveGames();
      } else {
        setLobbyState(prev => ({ ...prev, connectionStatus: 'disconnected' }));
      }
    } catch (error) {
      console.error('Failed to connect to multiplayer:', error);
      setLobbyState(prev => ({ ...prev, connectionStatus: 'disconnected' }));
    }
  }, []);

  const refreshAvailableRooms = async () => {
    try {
      const roomsResponse = await multiplayerGameAPI.getAvailableGames();
      if (roomsResponse.success && roomsResponse.games) {
        setLobbyState(prev => ({ ...prev, availableRooms: roomsResponse.games || [] }));
      }
    } catch (error) {
      console.error('Failed to load available rooms:', error);
    }
  };

  const refreshActiveGames = async () => {
    try {
      const activeGamesResponse = await multiplayerGameAPI.getActiveGames();
      console.log('Active games response:', activeGamesResponse);
      if (activeGamesResponse.success && activeGamesResponse.games) {
        setLobbyState(prev => ({ ...prev, activeGames: activeGamesResponse.games || [] }));
      }
    } catch (error) {
      console.error('Failed to load active games:', error);
    }
  };

  const setupEventListeners = useCallback(() => {
    multiplayerGameAPI.on('connected', () => {
      setLobbyState(prev => ({ ...prev, connectionStatus: 'connected' }));
    });

    multiplayerGameAPI.on('disconnected', () => {
      setLobbyState(prev => ({ ...prev, connectionStatus: 'disconnected' }));
    });

    multiplayerGameAPI.on('game_created', (data) => {
      console.log('Game created:', data);
      refreshAvailableRooms();
    });

    multiplayerGameAPI.on('game_started', (data) => {
      console.log('Game started:', data);
      setLobbyState(prev => ({ ...prev, currentRoom: data.gameRoom }));
      setGameMode('multiplayer_game');
    });

    multiplayerGameAPI.on('game_action_result', (data) => {
      console.log('Game action result:', data);
      // Update game state
    });

    multiplayerGameAPI.on('game_ended', (data) => {
      console.log('Game ended:', data);
      setGameMode('multiplayer_lobby');
      setLobbyState(prev => ({ ...prev, currentRoom: null }));
    });

    multiplayerGameAPI.on('player_left', (data) => {
      console.log('Player left:', data);
      setGameMode('multiplayer_lobby');
      setLobbyState(prev => ({ ...prev, currentRoom: null }));
    });

    multiplayerGameAPI.on('game_no_longer_available', (data) => {
      refreshAvailableRooms();
    });

    multiplayerGameAPI.on('backend_disconnected', (data) => {
      console.warn('Backend disconnected:', data);
      setLobbyState(prev => ({ ...prev, connectionStatus: 'disconnected' }));
    });

    multiplayerGameAPI.on('backend_error', (data) => {
      console.error('Backend error:', data);
      setLobbyState(prev => ({ ...prev, connectionStatus: 'disconnected' }));
    });
  }, []);

  useEffect(() => {
    setupEventListeners();
    return () => {
      // Cleanup event listeners
      multiplayerGameAPI.off('connected');
      multiplayerGameAPI.off('disconnected');
      multiplayerGameAPI.off('game_created');
      multiplayerGameAPI.off('game_started');
      multiplayerGameAPI.off('game_action_result');
      multiplayerGameAPI.off('game_ended');
      multiplayerGameAPI.off('player_left');
      multiplayerGameAPI.off('game_no_longer_available');
      // multiplayerGameAPI.off('backend_disconnected');
      multiplayerGameAPI.off('backend_error');
    };
  }, [setupEventListeners]);

  const createNewPlayer = async () => {
    if (!playerName.trim()) return;
    
    const newUserId = `player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    localStorage.setItem('pattern-game-user-id', newUserId);
    localStorage.setItem('pattern-game-player-name', playerName);
    
    setUserId(newUserId);
    setShowNameInput(false);
    
    await connectToMultiplayer(newUserId);
  };

  const createGameRoom = async () => {
    if (!userId) return;

    try {
      const request: CreateGameRoomRequest = {
        mode: 'pvp',
        gameSettings: {
          maxTurnTime: 120,
          deckSize: 30,
          maxHandSize: 7
        }
      };

      const response = await multiplayerGameAPI.createGameRoom(request);
      
      if (response.success && response.gameRoom) {
        setLobbyState(prev => ({ ...prev, currentRoom: response.gameRoom || null }));
        setGameMode('join_room'); // Show waiting room
        await refreshActiveGames();
      } else {
        console.error('Create room response:', response);
        if (response.error?.includes('already has an active game')) {
          // First refresh to see if we can find the active games
          const activeGamesResponse = await multiplayerGameAPI.getActiveGames();
          console.log('Active games after error:', activeGamesResponse);
          
          if (activeGamesResponse.success && activeGamesResponse.games && activeGamesResponse.games.length > 0) {
            // Update state with the active games
            setLobbyState(prev => ({ ...prev, activeGames: activeGamesResponse.games || [] }));
            alert(`You have ${activeGamesResponse.games.length} active game(s). Please check the "Your Active Games" section above to rejoin or leave them.`);
          } else {
            // Try to force clear any stale games
            alert('The server indicates you have an active game, but none are visible. Attempting to clear stale games...');
            
            // Make a direct API call to leave any potential stale games
            try {
              // Try to get and clear games one more time
              const retryResponse = await multiplayerGameAPI.getActiveGames();
              if (retryResponse.success && retryResponse.games) {
                for (const game of retryResponse.games) {
                  await multiplayerGameAPI.leaveGameRoom(game.id);
                }
              }
              alert('Stale games cleared. Please try creating a room again.');
              await refreshActiveGames();
            } catch (clearError) {
              console.error('Error clearing stale games:', clearError);
              alert('Could not clear stale games. Please try logging out and back in.');
            }
          }
        } else {
          console.error('Failed to create room:', response.error);
          alert(`Failed to create room: ${response.error}`);
        }
      }
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Error creating room. Please try again.');
    }
  };

  const joinGameRoom = async (roomId: string) => {
    if (!userId) return;

    try {
      const response = await multiplayerGameAPI.joinGameRoom(roomId);
      
      if (response.success && response.gameRoom) {
        setLobbyState(prev => ({ ...prev, currentRoom: response.gameRoom || null }));
        setGameMode('multiplayer_game');
      } else {
        console.error('Failed to join room:', response.error);
      }
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const leaveCurrentRoom = async () => {
    if (!lobbyState.currentRoom) return;

    try {
      await multiplayerGameAPI.leaveGameRoom(lobbyState.currentRoom.id);
      setLobbyState(prev => ({ ...prev, currentRoom: null }));
      setGameMode('multiplayer_lobby');
      await refreshActiveGames();
    } catch (error) {
      console.error('Error leaving room:', error);
    }
  };

  const rejoinGame = async (game: GameRoom) => {
    setLobbyState(prev => ({ ...prev, currentRoom: game }));
    
    if (game.status === 'waiting') {
      setGameMode('join_room');
    } else if (game.status === 'playing') {
      setGameMode('multiplayer_game');
    }
  };

  // Show name input screen
  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome to Pattern Card Battle</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 mb-6"
            onKeyPress={(e) => e.key === 'Enter' && createNewPlayer()}
          />
          <button
            onClick={createNewPlayer}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
          >
            Start Playing
          </button>
        </motion.div>
      </div>
    );
  }

  // Show single player game
  if (gameMode === 'singleplayer') {
    return <HearthstoneGameHub />;
  }

  // Show multiplayer game
  if (gameMode === 'multiplayer_game' && lobbyState.currentRoom) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Multiplayer Battle</h1>
            <button
              onClick={leaveCurrentRoom}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Leave Game
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Turn {lobbyState.currentRoom.turnNumber}</h3>
                <p className="text-gray-400">Current Player: {lobbyState.currentRoom.currentTurn}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Phase: {lobbyState.currentRoom.phase}</p>
                {lobbyState.currentRoom.turnTimer && (
                  <p className="text-sm text-yellow-400">Timer: {lobbyState.currentRoom.turnTimer}s</p>
                )}
              </div>
            </div>
          </div>

          {/* Game board would go here */}
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 mb-4">Multiplayer game board will be implemented here</p>
            <p className="text-sm text-gray-500">Game State: {JSON.stringify(lobbyState.currentRoom.gameState, null, 2)}</p>
          </div>
        </div>
      </div>
    );
  }

  // Show waiting room
  if (gameMode === 'join_room' && lobbyState.currentRoom) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full text-center"
        >
          <div className="mb-6">
            <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold mb-2">Waiting for Opponent</h2>
            <p className="text-gray-400">Room ID: {lobbyState.currentRoom.id.slice(-8)}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            
            <button
              onClick={leaveCurrentRoom}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show multiplayer lobby
  if (gameMode === 'multiplayer_lobby') {
    console.log('Lobby state:', lobbyState);
    console.log('Active games:', lobbyState.activeGames);
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Multiplayer Lobby</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {lobbyState.connectionStatus === 'connected' ? (
                    <Wifi className="w-5 h-5 text-green-400" />
                  ) : (
                    <WifiOff className="w-5 h-5 text-red-400" />
                  )}
                  <span className="text-sm text-gray-400 capitalize">{lobbyState.connectionStatus}</span>
                </div>
                {lobbyState.playerStats && (
                  <div className="flex items-center space-x-4 text-sm">
                    <span>Level {lobbyState.playerStats.level}</span>
                    <div className="flex items-center space-x-1">
                      <Coins className="w-4 h-4 text-yellow-400" />
                      <span>{lobbyState.playerStats.currency.coins}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4 text-blue-400" />
                      <span>{lobbyState.playerStats.wins}W/{lobbyState.playerStats.losses}L</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => setGameMode('menu')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Back to Menu
            </button>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={createGameRoom}
              disabled={lobbyState.connectionStatus !== 'connected'}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl p-6 transition-colors"
            >
              <Play className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Create Game Room</h3>
              <p className="text-sm text-gray-300">Start a new multiplayer game</p>
            </button>
            
            <button
              onClick={async () => {
                await refreshAvailableRooms();
                await refreshActiveGames();
              }}
              disabled={lobbyState.connectionStatus !== 'connected'}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl p-6 transition-colors"
            >
              <Eye className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Refresh Rooms</h3>
              <p className="text-sm text-gray-300">Update game lists</p>
            </button>
          </div>

          {/* Debug info */}
          <div className="bg-gray-800 rounded-xl p-4 mb-6 text-xs">
            <p>Debug: Active games count: {lobbyState.activeGames.length}</p>
            <p>User ID: {userId}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={refreshActiveGames} className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded">
                Manual Refresh Active Games
              </button>
              <button 
                onClick={async () => {
                  // Force cleanup of all active games
                  const activeGamesResponse = await multiplayerGameAPI.getActiveGames();
                  console.log('Active games to clear:', activeGamesResponse);
                  
                  if (activeGamesResponse.success && activeGamesResponse.games && activeGamesResponse.games.length > 0) {
                    alert(`Found ${activeGamesResponse.games.length} active game(s). Clearing...`);
                    for (const game of activeGamesResponse.games) {
                      console.log(`Leaving game ${game.id} with status ${game.status}`);
                      await multiplayerGameAPI.leaveGameRoom(game.id);
                    }
                    await refreshActiveGames();
                    alert('All active games have been cleared');
                  } else {
                    alert('No active games found to clear');
                  }
                }}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded"
              >
                Clear All Active Games
              </button>
            </div>
          </div>

          {/* Active games */}
          {lobbyState.activeGames.length > 0 && (
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-yellow-400">Your Active Games ({lobbyState.activeGames.length})</h2>
              <div className="space-y-3">
                {lobbyState.activeGames.map(game => (
                  <motion.div
                    key={game.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-semibold">
                        {game.hostPlayerId === userId ? 'Your game' : `Game with ${game.hostPlayerId.slice(-8)}`}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className={`capitalize px-2 py-0.5 rounded text-xs ${
                          game.status === 'waiting' ? 'bg-yellow-600 text-yellow-100' : 
                          game.status === 'playing' ? 'bg-green-600 text-green-100' : 
                          'bg-gray-600 text-gray-100'
                        }`}>
                          {game.status}
                        </span>
                        <span>Turn {game.turnNumber}</span>
                        {game.status === 'waiting' && !game.guestPlayerId && (
                          <span className="text-yellow-400">Waiting for opponent...</span>
                        )}
                        {game.guestPlayerId && (
                          <span>vs {game.guestPlayerId === userId ? game.hostPlayerId.slice(-8) : game.guestPlayerId.slice(-8)}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => rejoinGame(game)}
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm transition-colors"
                      >
                        Rejoin
                      </button>
                      <button
                        onClick={async () => {
                          await multiplayerGameAPI.leaveGameRoom(game.id);
                          await refreshActiveGames();
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
                      >
                        Leave
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Available rooms */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Available Game Rooms ({lobbyState.availableRooms.length})</h2>
            
            {lobbyState.availableRooms.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No active game rooms available</p>
                <p className="text-sm">Create a new room to start playing!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lobbyState.availableRooms.map(room => (
                  <motion.div
                    key={room.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-semibold">Room by {room.hostPlayerId.slice(-8)}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{room.mode.toUpperCase()}</span>
                        <span>Turn {room.turnNumber}</span>
                        <span className="capitalize">{room.status}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => joinGameRoom(room.id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition-colors"
                    >
                      Join Game
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Pattern Card Battle</h1>
          <p className="text-gray-400">Master AI patterns through strategic card battles</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <MenuCard
            title="Single Player"
            description="Battle against computer opponents"
            icon={<User className="w-8 h-8" />}
            onClick={() => setGameMode('singleplayer')}
            color="blue"
          />
          <MenuCard
            title="Multiplayer"
            description="Challenge other players online"
            icon={<Users className="w-8 h-8" />}
            onClick={async () => {
              setGameMode('multiplayer_lobby');
              // Refresh data when entering lobby
              setTimeout(async () => {
                await refreshAvailableRooms();
                await refreshActiveGames();
              }, 100);
            }}
            color="purple"
          />
          <MenuCard
            title="Collection"
            description="View and manage your pattern cards"
            icon={<Package className="w-8 h-8" />}
            onClick={() => setGameMode('singleplayer')} // Will show collection in single player mode
            color="green"
          />
          <MenuCard
            title="Logout"
            description="Save and exit the game"
            icon={<LogOut className="w-8 h-8" />}
            onClick={() => {
              localStorage.removeItem('pattern-game-user-id');
              localStorage.removeItem('pattern-game-player-name');
              multiplayerGameAPI.disconnect();
              setShowNameInput(true);
              setUserId(null);
              setPlayerName('');
            }}
            color="red"
          />
        </div>
      </div>
    </div>
  );
};

const MenuCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: 'blue' | 'purple' | 'green' | 'red';
}> = ({ title, description, icon, onClick, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        bg-gradient-to-br ${colorClasses[color]} 
        rounded-xl p-8 text-white text-left transition-all
        shadow-lg hover:shadow-xl
      `}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </motion.button>
  );
};