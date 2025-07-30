import { PatternCard } from '@/types/pattern-cards';
import { GameState, GameCard, GameAction, Player, BattleResult } from '@/types/pattern-game';

export class PatternGameEngine {
  private gameState: GameState;
  private actionHistory: GameAction[] = [];

  constructor(player: Player, opponent: Player, playerDeck: PatternCard[], opponentDeck: PatternCard[]) {
    this.gameState = this.initializeGameState(player, opponent, playerDeck, opponentDeck);
  }

  private initializeGameState(
    player: Player, 
    opponent: Player, 
    playerDeck: PatternCard[], 
    opponentDeck: PatternCard[]
  ): GameState {
    const shuffledPlayerDeck = this.shuffleDeck([...playerDeck]);
    const shuffledOpponentDeck = this.shuffleDeck([...opponentDeck]);

    return {
      id: `game-${Date.now()}`,
      players: { player, opponent },
      currentTurn: 'player',
      turnNumber: 1,
      phase: 'mulligan',
      board: {
        player: {
          field: Array(5).fill(null),
          hand: this.drawCards(shuffledPlayerDeck, 3),
          deck: shuffledPlayerDeck,
          graveyard: []
        },
        opponent: {
          field: Array(5).fill(null),
          hand: this.drawCards(shuffledOpponentDeck, 3),
          deck: shuffledOpponentDeck,
          graveyard: []
        }
      },
      resources: {
        player: {
          memory: 1,
          maxMemory: 1,
          computation: 3,
          maxComputation: 3
        },
        opponent: {
          memory: 1,
          maxMemory: 1,
          computation: 3,
          maxComputation: 3
        }
      }
    };
  }

  private shuffleDeck(deck: PatternCard[]): GameCard[] {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.map(card => this.convertToGameCard(card));
  }

  private convertToGameCard(pattern: PatternCard): GameCard {
    const attackValue = Math.round((pattern.stats.effectiveness + pattern.stats.performance) / 2);
    const defenseValue = Math.round((pattern.stats.complexity + pattern.stats.scalability) / 2);
    
    return {
      ...pattern,
      currentAttack: Math.round(attackValue * (1 + pattern.level * 0.1)),
      currentDefense: Math.round(defenseValue * (1 + pattern.level * 0.1)),
      currentHealth: Math.round(defenseValue * (1 + pattern.level * 0.15)),
      exhausted: false,
      buffed: false,
      debuffed: false
    };
  }

  private drawCards(deck: GameCard[], count: number): GameCard[] {
    return deck.splice(0, count);
  }

  executeAction(action: GameAction): boolean {
    if (!this.validateAction(action)) {
      return false;
    }

    this.actionHistory.push(action);

    switch (action.type) {
      case 'play_card':
        return this.playCard(action);
      case 'attack':
        return this.executeAttack(action);
      case 'use_ability':
        return this.useAbility(action);
      case 'end_turn':
        return this.endTurn();
      case 'surrender':
        return this.surrender(action.playerId);
      default:
        return false;
    }
  }

  private validateAction(action: GameAction): boolean {
    if (this.gameState.phase === 'gameOver') return false;
    if (action.playerId !== this.gameState.currentTurn) return false;
    
    switch (action.type) {
      case 'play_card':
        return this.canPlayCard(action);
      case 'attack':
        return this.canAttack(action);
      case 'use_ability':
        return this.canUseAbility(action);
      case 'end_turn':
        return true;
      case 'surrender':
        return true;
      default:
        return false;
    }
  }

  private canPlayCard(action: GameAction): boolean {
    if (!action.data?.cardId || action.data.toPosition === undefined) return false;
    
    const playerBoard = this.gameState.board[action.playerId];
    const card = playerBoard.hand.find(c => c.id === action.data!.cardId);
    
    if (!card) return false;
    if (playerBoard.field[action.data.toPosition] !== null) return false;
    
    const resources = this.gameState.resources[action.playerId];
    const memoryCost = Math.ceil(card.stats.complexity / 20);
    
    return resources.memory >= memoryCost;
  }

  private playCard(action: GameAction): boolean {
    const playerBoard = this.gameState.board[action.playerId];
    const cardIndex = playerBoard.hand.findIndex(c => c.id === action.data!.cardId);
    
    if (cardIndex === -1) return false;
    
    const card = playerBoard.hand.splice(cardIndex, 1)[0];
    const memoryCost = Math.ceil(card.stats.complexity / 20);
    
    this.gameState.resources[action.playerId].memory -= memoryCost;
    playerBoard.field[action.data!.toPosition!] = card;
    card.position = action.data!.toPosition;
    card.exhausted = true;
    
    return true;
  }

  private canAttack(action: GameAction): boolean {
    if (!action.data?.cardId || action.data.targetId === undefined) return false;
    
    const attackerField = this.gameState.board[action.playerId].field;
    const attacker = attackerField.find(c => c?.id === action.data!.cardId);
    
    if (!attacker || attacker.exhausted) return false;
    
    const targetPlayer = action.playerId === 'player' ? 'opponent' : 'player';
    const targetField = this.gameState.board[targetPlayer].field;
    const target = targetField.find(c => c?.id === action.data!.targetId);
    
    return target !== null;
  }

  private executeAttack(action: GameAction): boolean {
    const attackerField = this.gameState.board[action.playerId].field;
    const attacker = attackerField.find(c => c?.id === action.data!.cardId);
    
    if (!attacker) return false;
    
    const targetPlayer = action.playerId === 'player' ? 'opponent' : 'player';
    const targetField = this.gameState.board[targetPlayer].field;
    const targetIndex = targetField.findIndex(c => c?.id === action.data!.targetId);
    const target = targetField[targetIndex];
    
    if (!target) return false;
    
    target.currentHealth! -= attacker.currentAttack!;
    attacker.currentHealth! -= target.currentAttack!;
    
    if (target.currentHealth! <= 0) {
      targetField[targetIndex] = null;
      this.gameState.board[targetPlayer].graveyard.push(target);
    }
    
    if (attacker.currentHealth! <= 0) {
      const attackerIndex = attackerField.findIndex(c => c?.id === attacker.id);
      attackerField[attackerIndex] = null;
      this.gameState.board[action.playerId].graveyard.push(attacker);
    } else {
      attacker.exhausted = true;
    }
    
    return true;
  }

  private canUseAbility(action: GameAction): boolean {
    if (!action.data?.cardId || action.data.abilityIndex === undefined) return false;
    
    const playerField = this.gameState.board[action.playerId].field;
    const card = playerField.find(c => c?.id === action.data!.cardId);
    
    if (!card || card.exhausted) return false;
    if (!card.abilities[action.data.abilityIndex]) return false;
    
    const resources = this.gameState.resources[action.playerId];
    return resources.computation >= 1;
  }

  private useAbility(action: GameAction): boolean {
    const playerField = this.gameState.board[action.playerId].field;
    const card = playerField.find(c => c?.id === action.data!.cardId);
    
    if (!card) return false;
    
    this.gameState.resources[action.playerId].computation -= 1;
    card.exhausted = true;
    
    // Implement ability effects based on the ability
    const ability = card.abilities[action.data!.abilityIndex!];
    this.applyAbilityEffect(ability, action.playerId, card);
    
    return true;
  }

  private applyAbilityEffect(ability: any, playerId: string, sourceCard: GameCard) {
    // Simplified ability effects - can be expanded
    switch (ability.name) {
      case 'Sequential Analysis':
        this.drawCardsForPlayer(playerId, 1);
        break;
      case 'Thought Tracing':
        sourceCard.currentAttack! += 2;
        sourceCard.buffed = true;
        break;
      case 'Context Retention':
        this.gameState.resources[playerId].memory += 1;
        break;
      default:
        break;
    }
  }

  private drawCardsForPlayer(playerId: string, count: number) {
    const playerBoard = this.gameState.board[playerId];
    const drawnCards = playerBoard.deck.splice(0, count);
    playerBoard.hand.push(...drawnCards);
  }

  private endTurn(): boolean {
    this.gameState.phase = 'end';
    
    const nextPlayer = this.gameState.currentTurn === 'player' ? 'opponent' : 'player';
    this.gameState.currentTurn = nextPlayer;
    this.gameState.turnNumber++;
    
    const resources = this.gameState.resources[nextPlayer];
    resources.maxMemory = Math.min(10, this.gameState.turnNumber);
    resources.memory = resources.maxMemory;
    resources.computation = resources.maxComputation;
    
    const field = this.gameState.board[nextPlayer].field;
    field.forEach(card => {
      if (card) {
        card.exhausted = false;
      }
    });
    
    this.drawCardsForPlayer(nextPlayer, 1);
    this.gameState.phase = 'main';
    
    this.checkWinCondition();
    
    return true;
  }

  private surrender(playerId: string): boolean {
    this.gameState.winner = playerId === 'player' ? 'opponent' : 'player';
    this.gameState.phase = 'gameOver';
    return true;
  }

  private checkWinCondition() {
    const playerDeckEmpty = this.gameState.board.player.deck.length === 0;
    const opponentDeckEmpty = this.gameState.board.opponent.deck.length === 0;
    
    if (playerDeckEmpty) {
      this.gameState.winner = 'opponent';
      this.gameState.phase = 'gameOver';
    } else if (opponentDeckEmpty) {
      this.gameState.winner = 'player';
      this.gameState.phase = 'gameOver';
    }
  }

  getGameState(): GameState {
    return { ...this.gameState };
  }

  getBattleResult(): BattleResult | null {
    if (this.gameState.phase !== 'gameOver' || !this.gameState.winner) {
      return null;
    }

    const isPlayerWinner = this.gameState.winner === 'player';
    const baseXP = isPlayerWinner ? 100 : 25;
    const baseCoins = isPlayerWinner ? 50 : 10;
    
    return {
      winner: this.gameState.winner,
      experienceGained: baseXP * this.gameState.turnNumber,
      coinsEarned: baseCoins * Math.ceil(this.gameState.turnNumber / 5),
      patternsUnlocked: [],
      playerLevelUp: false,
      statistics: {
        turnsPlayed: this.gameState.turnNumber,
        cardsPlayed: this.actionHistory.filter(a => a.type === 'play_card').length,
        damageDealt: 0,
        healingDone: 0
      }
    };
  }
}