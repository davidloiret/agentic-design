import { 
  BattleState, BattleCard, PlayerState, BattleAction, 
  CardEffect, Animation, BATTLE_CONSTANTS, HeroClass 
} from '@/types/hearthstone-battle';
import { PatternCard } from '@/types/pattern-cards';

export class HearthstoneEngine {
  private state: BattleState;
  private animations: Animation[] = [];

  constructor(
    player1Deck: PatternCard[],
    player2Deck: PatternCard[],
    player1Hero: HeroClass,
    player2Hero: HeroClass
  ) {
    this.state = this.initializeBattle(player1Deck, player2Deck, player1Hero, player2Hero);
  }

  private initializeBattle(
    p1Deck: PatternCard[],
    p2Deck: PatternCard[],
    p1Hero: HeroClass,
    p2Hero: HeroClass
  ): BattleState {
    const player1 = this.initializePlayer(p1Deck, p1Hero);
    const player2 = this.initializePlayer(p2Deck, p2Hero);

    console.log('Game initialized - Player 1 health:', player1.health, 'Player 2 health:', player2.health);

    // Draw starting hands
    this.drawCards(player1, BATTLE_CONSTANTS.STARTING_HAND_SIZE);
    this.drawCards(player2, BATTLE_CONSTANTS.STARTING_HAND_SIZE);

    // Player 2 gets coin
    player2.hand.push(this.createCoinCard());

    return {
      player1,
      player2,
      currentPlayer: 'player1',
      turnNumber: 1,
      turnTimeRemaining: BATTLE_CONSTANTS.TURN_TIME,
      phase: 'mulligan',
      history: [],
      animations: []
    };
  }

  private initializePlayer(deck: PatternCard[], hero: HeroClass): PlayerState {
    const battleDeck = this.convertToBattleCards(deck);
    this.shuffleDeck(battleDeck);

    return {
      hero,
      health: hero.startingHealth,
      armor: 0,
      mana: 0,
      maxMana: 0,
      overloadedMana: 0,
      temporaryMana: 0,
      deck: battleDeck,
      hand: [],
      board: Array(BATTLE_CONSTANTS.MAX_BOARD_SIZE).fill(null),
      graveyard: [],
      heroPowerUsed: false,
      heroPowerCost: hero.heroPower.cost,
      fatigueDamage: 0,
      spellDamage: 0,
      weaponAttack: 0,
      weaponDurability: 0,
      secrets: []
    };
  }

  private convertToBattleCards(patterns: PatternCard[]): BattleCard[] {
    return patterns.map(pattern => {
      // Calculate stats based on pattern properties
      const cost = Math.ceil(pattern.stats.complexity / 15);
      const attack = Math.ceil((pattern.stats.effectiveness + pattern.stats.performance) / 20);
      const health = Math.ceil((pattern.stats.scalability + pattern.stats.flexibility) / 15);

      // Ensure reasonable stats
      const finalAttack = Math.min(10, Math.max(1, attack + pattern.level));
      const finalHealth = Math.min(15, Math.max(1, health + Math.ceil(pattern.level * 1.5)));

      const battleCard: BattleCard = {
        ...pattern,
        cost: Math.min(10, Math.max(1, cost)),
        attack: finalAttack,
        health: finalHealth,
        maxHealth: finalHealth,
        cardType: this.determineCardType(pattern),
        canAttack: false,
        hasAttacked: false,
        isFrozen: false,
        hasTaunt: pattern.keywords?.taunt || pattern.type === 'structural',
        hasCharge: pattern.keywords?.charge || false,
        hasDivineShield: pattern.keywords?.divineShield || false,
        hasWindfury: pattern.keywords?.windfury || false,
        hasStealth: pattern.keywords?.stealth || false,
        hasLifesteal: pattern.keywords?.lifesteal || false,
        isPoisonous: pattern.keywords?.poisonous || false,
        attackBuff: 0,
        healthBuff: 0,
        tempAttackBuff: 0
      };

      // Add special effects based on pattern abilities
      if (pattern.abilities.length > 0) {
        battleCard.battlecry = this.createEffectFromAbility(pattern.abilities[0]);
      }

      return battleCard;
    });
  }

  private determineCardType(pattern: PatternCard): 'minion' | 'spell' | 'weapon' {
    if (pattern.type === 'behavioral' || pattern.type === 'structural') return 'minion';
    if (pattern.type === 'cognitive') return 'spell';
    return 'minion';
  }

  private createEffectFromAbility(ability: any): CardEffect {
    // Map pattern abilities to card effects
    const effectMap: Record<string, CardEffect> = {
      'Sequential Analysis': { type: 'draw', target: 'self', value: 1 },
      'Thought Tracing': { type: 'buff', target: 'self', value: 2 },
      'Context Retention': { type: 'addMana', target: 'self', value: 1 },
      'Branch Exploration': { type: 'discover', target: 'self' },
      'Pruning': { type: 'damage', target: 'randomEnemy', value: 3 },
      'Quick Recall': { type: 'draw', target: 'self', value: 2 },
      'Output Analysis': { type: 'buff', target: 'allFriendly', value: 1 },
      'Adaptive Planning': { type: 'heal', target: 'hero', value: 3 }
    };

    return effectMap[ability.name] || { type: 'damage', target: 'randomEnemy', value: 2 };
  }

  private createCoinCard(): BattleCard {
    return {
      id: 'coin',
      name: 'The Coin',
      description: 'Gain 1 Mana Crystal this turn only.',
      rarity: 'common',
      type: 'creational',
      element: 'computation',
      cost: 0,
      attack: 0,
      health: 0,
      maxHealth: 0,
      cardType: 'spell',
      stats: { complexity: 0, effectiveness: 0, flexibility: 0, performance: 0, scalability: 0 },
      abilities: [],
      discovered: true,
      owned: true,
      level: 1,
      experience: 0,
      maxExperience: 0,
      canAttack: false,
      hasAttacked: false,
      isFrozen: false,
      hasTaunt: false,
      hasCharge: false,
      hasDivineShield: false,
      hasWindfury: false,
      hasStealth: false,
      hasLifesteal: false,
      isPoisonous: false,
      attackBuff: 0,
      healthBuff: 0,
      tempAttackBuff: 0,
      battlecry: { type: 'addMana', target: 'self', value: 1 }
    };
  }

  executeAction(action: BattleAction): boolean {
    if (!this.validateAction(action)) return false;

    this.state.history.push(action);

    switch (action.type) {
      case 'mulligan':
        return this.handleMulligan(action);
      case 'play_card':
        return this.playCard(action);
      case 'attack':
        return this.executeAttack(action);
      case 'hero_power':
        return this.useHeroPower(action);
      case 'end_turn':
        return this.endTurn();
      default:
        return false;
    }
  }

  private validateAction(action: BattleAction): boolean {
    if (this.state.phase === 'ended') return false;
    if (action.playerId !== this.state.currentPlayer && action.type !== 'mulligan') return false;
    
    return true;
  }

  private playCard(action: BattleAction): boolean {
    const player = this.state[action.playerId];
    const cardIndex = player.hand.findIndex(c => c.id === action.data.cardId);
    
    if (cardIndex === -1) return false;
    
    const card = player.hand[cardIndex];
    
    // Check mana
    if (player.mana < card.cost) return false;
    
    // Check board space for minions
    if (card.cardType === 'minion') {
      const emptySlot = player.board.findIndex(slot => slot === null);
      if (emptySlot === -1) return false;
      
      // Remove from hand and place on board
      player.hand.splice(cardIndex, 1);
      player.mana -= card.cost;
      player.board[action.data.position || emptySlot] = card;
      
      // Apply charge
      if (card.hasCharge) {
        card.canAttack = true;
      }
      
      // Apply spell damage
      if (card.keywords?.spell_damage) {
        player.spellDamage += card.keywords.spell_damage;
      }
      
      // Trigger battlecry
      if (card.battlecry) {
        this.applyEffect(card.battlecry, action.playerId, card.id);
      }
      
      this.addAnimation({
        type: 'card_played',
        sourceId: card.id,
        targetPosition: action.data.position || emptySlot,
        duration: 500
      });
      
    } else if (card.cardType === 'spell') {
      // Remove from hand
      player.hand.splice(cardIndex, 1);
      player.mana -= card.cost;
      
      // Apply spell effect
      if (card.battlecry) {
        this.applyEffect(card.battlecry, action.playerId, card.id, action.data.targetId);
      }
      
      // Move to graveyard
      player.graveyard.push(card);
      
      this.addAnimation({
        type: 'spell_cast',
        sourceId: card.id,
        targetId: action.data.targetId,
        duration: 1000
      });
    }
    
    return true;
  }

  private executeAttack(action: BattleAction): boolean {
    const player = this.state[action.playerId];
    const enemyPlayer = this.state[action.playerId === 'player1' ? 'player2' : 'player1'];
    
    const attacker = player.board.find(c => c?.id === action.data.cardId);
    if (!attacker || !attacker.canAttack || attacker.hasAttacked) return false;
    
    let damage = attacker.attack + attacker.attackBuff + attacker.tempAttackBuff;
    
    if (action.data.targetId === 'hero') {
      // Attack enemy hero
      console.log(`Hero attacked! Damage: ${damage}, Current health: ${enemyPlayer.health}, New health: ${enemyPlayer.health - damage}`);
      enemyPlayer.health -= damage;
      
      if (attacker.hasLifesteal) {
        player.health = Math.min(player.health + damage, player.hero.startingHealth);
      }
      
      this.addAnimation({
        type: 'attack',
        sourceId: attacker.id,
        targetId: 'enemy-hero',
        duration: 500
      });
      
      this.addAnimation({
        type: 'damage',
        targetId: 'enemy-hero',
        value: damage,
        duration: 300
      });
      
    } else {
      // Attack minion
      const defender = enemyPlayer.board.find(c => c?.id === action.data.targetId);
      if (!defender) return false;
      
      // Check taunt
      const hasTaunts = enemyPlayer.board.some(c => c && c.hasTaunt);
      if (hasTaunts && !defender.hasTaunt) return false;
      
      // Deal damage
      this.dealDamage(defender, damage, enemyPlayer);
      this.dealDamage(attacker, defender.attack + defender.attackBuff, player);
      
      this.addAnimation({
        type: 'attack',
        sourceId: attacker.id,
        targetId: defender.id,
        duration: 500
      });
    }
    
    // Handle windfury - allows two attacks per turn
    if (attacker.hasWindfury && !attacker.hasAttacked) {
      attacker.hasAttacked = true;
      // Still can attack once more
    } else {
      attacker.hasAttacked = true;
      attacker.canAttack = false;
    }
    
    this.checkForDeaths();
    this.checkWinCondition();
    
    return true;
  }

  private dealDamage(card: BattleCard, damage: number, owner: PlayerState) {
    if (card.hasDivineShield && damage > 0) {
      card.hasDivineShield = false;
      return;
    }
    
    card.health -= damage;
    
    if (card.onDamaged && damage > 0) {
      this.applyEffect(card.onDamaged, owner === this.state.player1 ? 'player1' : 'player2', card.id);
    }
    
    this.addAnimation({
      type: 'damage',
      targetId: card.id,
      value: damage,
      duration: 300
    });
  }

  private useHeroPower(action: BattleAction): boolean {
    const player = this.state[action.playerId];
    
    if (player.heroPowerUsed) return false;
    if (player.mana < player.heroPowerCost) return false;
    
    player.mana -= player.heroPowerCost;
    player.heroPowerUsed = true;
    
    this.applyEffect(
      player.hero.heroPower.effect, 
      action.playerId, 
      'hero',
      action.data.targetId
    );
    
    return true;
  }

  private applyEffect(effect: CardEffect, playerId: string, sourceId?: string, targetId?: string) {
    const player = this.state[playerId];
    const enemy = this.state[playerId === 'player1' ? 'player2' : 'player1'];
    
    switch (effect.type) {
      case 'damage':
        this.applyDamageEffect(effect, player, enemy, targetId);
        break;
      case 'heal':
        this.applyHealEffect(effect, player, enemy, targetId);
        break;
      case 'draw':
        this.drawCards(player, effect.value || 1);
        break;
      case 'buff':
        this.applyBuffEffect(effect, player, enemy, sourceId);
        break;
      case 'addMana':
        player.temporaryMana += effect.value || 1;
        break;
      case 'aoe':
        this.applyAoeEffect(effect, player, enemy);
        break;
    }
  }

  private applyDamageEffect(effect: CardEffect, player: PlayerState, enemy: PlayerState, targetId?: string) {
    const damage = (effect.value || 0) + player.spellDamage;
    
    switch (effect.target) {
      case 'enemyHero':
        enemy.health -= damage;
        this.addAnimation({
          type: 'damage',
          targetId: 'enemy-hero',
          value: damage,
          duration: 500
        });
        this.checkWinCondition();
        break;
      case 'randomEnemy':
        const validTargets = enemy.board.filter(c => c !== null);
        if (validTargets.length > 0) {
          const target = validTargets[Math.floor(Math.random() * validTargets.length)];
          this.dealDamage(target!, damage, enemy);
        }
        break;
      case 'allEnemies':
        enemy.board.forEach(card => {
          if (card) this.dealDamage(card, damage, enemy);
        });
        break;
    }
  }

  private applyHealEffect(effect: CardEffect, player: PlayerState, enemy: PlayerState, targetId?: string) {
    const heal = effect.value || 0;
    
    switch (effect.target) {
      case 'hero':
        player.health = Math.min(player.health + heal, player.hero.startingHealth);
        break;
      case 'allFriendly':
        player.board.forEach(card => {
          if (card) {
            card.health = Math.min(card.health + heal, card.maxHealth);
          }
        });
        break;
    }
  }

  private applyBuffEffect(effect: CardEffect, player: PlayerState, enemy: PlayerState, sourceId?: string) {
    const buff = effect.value || 1;
    
    switch (effect.target) {
      case 'self':
        const self = player.board.find(c => c?.id === sourceId);
        if (self) {
          self.attackBuff += buff;
          self.healthBuff += buff;
          self.health += buff;
          self.maxHealth += buff;
        }
        break;
      case 'allFriendly':
        player.board.forEach(card => {
          if (card && card.id !== sourceId) {
            card.attackBuff += buff;
            card.healthBuff += buff;
            card.health += buff;
            card.maxHealth += buff;
          }
        });
        break;
    }
  }

  private applyAoeEffect(effect: CardEffect, player: PlayerState, enemy: PlayerState) {
    const damage = (effect.value || 0) + player.spellDamage;
    
    enemy.board.forEach(card => {
      if (card) this.dealDamage(card, damage, enemy);
    });
    
    player.board.forEach(card => {
      if (card) this.dealDamage(card, damage, player);
    });
  }

  private checkForDeaths() {
    [this.state.player1, this.state.player2].forEach((player, index) => {
      player.board = player.board.map(card => {
        if (card && card.health <= 0) {
          // Remove spell damage if this minion had it
          if (card.keywords?.spell_damage) {
            player.spellDamage -= card.keywords.spell_damage;
          }
          
          // Trigger deathrattle
          if (card.deathrattle) {
            this.applyEffect(
              card.deathrattle, 
              index === 0 ? 'player1' : 'player2',
              card.id
            );
          }
          
          player.graveyard.push(card);
          
          this.addAnimation({
            type: 'death',
            targetId: card.id,
            duration: 500
          });
          
          return null;
        }
        return card;
      });
    });
  }

  private endTurn(): boolean {
    const currentPlayer = this.state[this.state.currentPlayer];
    
    // Reset temp buffs
    currentPlayer.board.forEach(card => {
      if (card) {
        card.tempAttackBuff = 0;
      }
    });
    
    // Switch players
    this.state.currentPlayer = this.state.currentPlayer === 'player1' ? 'player2' : 'player1';
    const nextPlayer = this.state[this.state.currentPlayer];
    
    // Start of turn
    this.state.turnNumber++;
    nextPlayer.maxMana = Math.min(BATTLE_CONSTANTS.MAX_MANA, Math.ceil(this.state.turnNumber / 2));
    nextPlayer.mana = nextPlayer.maxMana - nextPlayer.overloadedMana + nextPlayer.temporaryMana;
    nextPlayer.overloadedMana = 0;
    nextPlayer.temporaryMana = 0;
    nextPlayer.heroPowerUsed = false;
    
    // Reset minion attacks
    nextPlayer.board.forEach(card => {
      if (card && !card.isFrozen) {
        card.canAttack = true;
        card.hasAttacked = false;
      }
    });
    
    // Draw card
    this.drawCards(nextPlayer, 1);
    
    // Trigger start of turn effects
    nextPlayer.board.forEach(card => {
      if (card?.startOfTurn) {
        this.applyEffect(card.startOfTurn, this.state.currentPlayer, card.id);
      }
    });
    
    this.state.turnTimeRemaining = BATTLE_CONSTANTS.TURN_TIME;
    
    return true;
  }

  private drawCards(player: PlayerState, count: number) {
    for (let i = 0; i < count; i++) {
      if (player.deck.length === 0) {
        // Fatigue damage
        player.fatigueDamage++;
        player.health -= player.fatigueDamage;
        
        this.addAnimation({
          type: 'damage',
          targetId: 'hero',
          value: player.fatigueDamage,
          duration: 500
        });
        
        // Check if fatigue killed the player
        this.checkWinCondition();
      } else if (player.hand.length < BATTLE_CONSTANTS.MAX_HAND_SIZE) {
        const card = player.deck.shift()!;
        player.hand.push(card);
        
        this.addAnimation({
          type: 'draw',
          targetId: card.id,
          duration: 300
        });
      } else {
        // Burn card (overdraw)
        const card = player.deck.shift()!;
        player.graveyard.push(card);
      }
    }
  }

  private handleMulligan(action: BattleAction): boolean {
    if (this.state.phase !== 'mulligan') return false;
    
    // Simplified mulligan - just start the game
    this.state.phase = 'playing';
    this.state.player1.maxMana = 1;
    this.state.player1.mana = 1;
    
    return true;
  }

  private checkWinCondition() {
    if (this.state.player1.health <= 0) {
      console.log('Player 1 defeated! Health:', this.state.player1.health);
      this.state.winner = 'player2';
      this.state.phase = 'ended';
    } else if (this.state.player2.health <= 0) {
      console.log('Player 2 defeated! Health:', this.state.player2.health);
      this.state.winner = 'player1';
      this.state.phase = 'ended';
    }
  }

  private shuffleDeck(deck: BattleCard[]) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  private addAnimation(animation: Animation) {
    this.animations.push(animation);
  }

  getState(): BattleState {
    return { ...this.state };
  }

  getAnimations(): Animation[] {
    const anims = [...this.animations];
    this.animations = [];
    return anims;
  }
}