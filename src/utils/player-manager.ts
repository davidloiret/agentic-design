import { Player } from '@/types/pattern-game';

export class PlayerManager {
  private static readonly XP_PER_LEVEL = 1000;
  private static readonly LEVEL_SCALING = 1.2;

  static createNewPlayer(name: string): Player {
    return {
      id: `player-${Date.now()}`,
      name,
      level: 1,
      experience: 0,
      experienceToNextLevel: this.XP_PER_LEVEL,
      wins: 0,
      losses: 0,
      currentDeckId: '',
      unlockedPatterns: [],
      currency: {
        coins: 100,
        gems: 0
      }
    };
  }

  static addExperience(player: Player, amount: number): { leveledUp: boolean; newLevel: number } {
    player.experience += amount;
    let leveledUp = false;
    let levelsGained = 0;

    while (player.experience >= player.experienceToNextLevel) {
      player.experience -= player.experienceToNextLevel;
      player.level++;
      levelsGained++;
      player.experienceToNextLevel = Math.round(
        this.XP_PER_LEVEL * Math.pow(this.LEVEL_SCALING, player.level - 1)
      );
      leveledUp = true;
    }

    if (leveledUp) {
      // Reward for leveling up
      player.currency.coins += 50 * levelsGained;
      if (player.level % 5 === 0) {
        player.currency.gems += 10;
      }
    }

    return { leveledUp, newLevel: player.level };
  }

  static recordBattle(player: Player, won: boolean): void {
    if (won) {
      player.wins++;
    } else {
      player.losses++;
    }
  }

  static getWinRate(player: Player): number {
    const totalGames = player.wins + player.losses;
    if (totalGames === 0) return 0;
    return (player.wins / totalGames) * 100;
  }

  static unlockPattern(player: Player, patternId: string): boolean {
    if (player.unlockedPatterns.includes(patternId)) {
      return false;
    }
    player.unlockedPatterns.push(patternId);
    return true;
  }

  static canAfford(player: Player, coinCost: number, gemCost: number = 0): boolean {
    return player.currency.coins >= coinCost && player.currency.gems >= gemCost;
  }

  static spendCurrency(player: Player, coinCost: number, gemCost: number = 0): boolean {
    if (!this.canAfford(player, coinCost, gemCost)) {
      return false;
    }
    player.currency.coins -= coinCost;
    player.currency.gems -= gemCost;
    return true;
  }

  static getPlayerRank(level: number): string {
    if (level < 10) return 'Novice';
    if (level < 20) return 'Apprentice';
    if (level < 30) return 'Adept';
    if (level < 40) return 'Expert';
    if (level < 50) return 'Master';
    if (level < 60) return 'Grandmaster';
    if (level < 70) return 'Champion';
    if (level < 80) return 'Legend';
    if (level < 90) return 'Mythic';
    return 'Transcendent';
  }

  static getDeckSlots(level: number): number {
    return Math.min(10, 3 + Math.floor(level / 10));
  }

  static savePlayer(player: Player): void {
    localStorage.setItem('currentPlayer', JSON.stringify(player));
  }

  static loadPlayer(): Player | null {
    const saved = localStorage.getItem('currentPlayer');
    if (!saved) return null;
    return JSON.parse(saved);
  }
}