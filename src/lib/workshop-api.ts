// Workshop API client for backend integration

interface Workshop {
  id: string;
  title: string;
  description: string;
  workshopCode?: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    totalWorkshops: number;
  };
  type: 'online' | 'onsite' | 'hybrid';
  tier: 'free' | 'basic' | 'premium' | 'enterprise';
  status: string;
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  currentParticipants: number;
  price?: number;
  requirements: string[];
  learningOutcomes: string[];
  totalXpReward: number;
  badges: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  gamificationConfig: {
    enableTeams: boolean;
    enableLeaderboard: boolean;
    enableBattles: boolean;
  };
  schedule: {
    sessions: Array<{
      date: string;
      title: string;
    }>;
  };
  locationDetails?: {
    city?: string;
    country?: string;
  };
  prerequisites?: {
    minLevel?: number;
    requiredJourneys?: string[];
  };
}


class WorkshopAPI {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      credentials: 'include', // Include cookies for authentication
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getWorkshops(): Promise<Workshop[]> {
    return await this.fetchWithAuth('/workshops');
  }

  async getWorkshopById(id: string): Promise<Workshop | null> {
    return await this.fetchWithAuth(`/workshops/${id}`);
  }

  async joinByCode(code: string): Promise<any> {
    if (!code || code.length < 3) {
      throw new Error('Please enter a valid code');
    }

    try {
      return await this.fetchWithAuth('/workshops/join-by-code', {
        method: 'POST',
        body: JSON.stringify({ code: code.toUpperCase() }),
      });
    } catch (error: any) {
      console.error('Failed to join by code:', error);
      
      // Provide more specific error messages
      if (error.message.includes('404') || error.message.includes('not found')) {
        throw new Error('Code not found. Please check the code and try again.');
      } else if (error.message.includes('401') || error.message.includes('unauthorized')) {
        throw new Error('Please log in to join a workshop.');
      } else {
        throw new Error(error.message || 'Failed to join. Please try again.');
      }
    }
  }

  async enrollInWorkshop(workshopId: string, enrollmentData: any): Promise<any> {
    try {
      return await this.fetchWithAuth(`/workshops/${workshopId}/enroll`, {
        method: 'POST',
        body: JSON.stringify(enrollmentData),
      });
    } catch (error) {
      console.error('Failed to enroll in workshop:', error);
      throw error;
    }
  }

  async getWorkshopSessions(workshopId: string): Promise<any[]> {
    return await this.fetchWithAuth(`/workshops/${workshopId}/sessions`);
  }

  async createWorkshop(workshopData: any): Promise<any> {
    try {
      return await this.fetchWithAuth('/workshops', {
        method: 'POST',
        body: JSON.stringify(workshopData),
      });
    } catch (error: any) {
      console.error('Failed to create workshop:', error);
      if (error.message.includes('403') || error.message.includes('permission')) {
        throw new Error('You do not have permission to create workshops. Only authorized instructors can create workshops.');
      }
      throw error;
    }
  }

  async canCreateWorkshop(): Promise<{ canCreate: boolean; userEmail: string; isInstructor: boolean }> {
    try {
      return await this.fetchWithAuth('/workshops/can-create');
    } catch (error) {
      console.error('Failed to check workshop creation permission:', error);
      return { canCreate: false, userEmail: '', isInstructor: false };
    }
  }

  async getWorkshopLeaderboard(workshopId: string): Promise<any> {
    return await this.fetchWithAuth(`/workshops/${workshopId}/leaderboard`);
  }

  async getEnrollmentStatus(workshopId: string): Promise<{ isEnrolled: boolean; enrollment: any | null }> {
    return await this.fetchWithAuth(`/workshops/${workshopId}/enrollment-status`);
  }

  async joinSessionById(workshopId: string, sessionId: string): Promise<any> {
    return await this.fetchWithAuth(`/workshops/${workshopId}/sessions/${sessionId}/join`, {
      method: 'POST'
    });
  }

  async startSession(workshopId: string, sessionId: string): Promise<any> {
    return await this.fetchWithAuth(`/workshops/${workshopId}/sessions/${sessionId}/start`, {
      method: 'POST'
    });
  }

  async getLiveSessions(): Promise<any[]> {
    return await this.fetchWithAuth('/workshops/live-sessions');
  }
}

export const workshopApi = new WorkshopAPI();
export type { Workshop };