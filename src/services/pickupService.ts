// Pickup service for managing waste pickups
export interface Pickup {
  id: number;
  userId: string;
  wasteType: string;
  pickupDate: string;
  pickupTime: string;
  address: string;
  estimatedWeight?: number;
  actualWeight?: number;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  collectorId?: string | null;
  notes?: string;
  createdAt: string;
  completedAt?: string | null;
}

export const pickupService = {
  // Get all pickups
  async getPickups(filters?: { status?: string; limit?: number }): Promise<{ pickups: Pickup[] }> {
    try {
      let url = '/api/pickups';
      const params = new URLSearchParams();
      
      if (filters?.status) {
        params.append('status', filters.status);
      }
      if (filters?.limit) {
        params.append('limit', filters.limit.toString());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch pickups');
      }
      const data = await response.json();
      return { pickups: data };
    } catch (error) {
      console.error('Error fetching pickups:', error);
      return { pickups: [] };
    }
  },

  // Get pickup by ID
  async getPickupById(id: number): Promise<Pickup | null> {
    try {
      const response = await fetch(`/api/pickups?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch pickup');
      }
      const data = await response.json();
      return data[0] || null;
    } catch (error) {
      console.error('Error fetching pickup:', error);
      return null;
    }
  },

  // Create new pickup
  async createPickup(data: Omit<Pickup, 'id' | 'createdAt'>): Promise<Pickup> {
    try {
      const response = await fetch('/api/pickups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create pickup');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating pickup:', error);
      throw error;
    }
  },

  // Update pickup
  async updatePickup(id: number, updates: Partial<Pickup>): Promise<Pickup | null> {
    try {
      const response = await fetch('/api/pickups', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updates }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update pickup');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating pickup:', error);
      return null;
    }
  },

  // Delete pickup
  async deletePickup(id: number): Promise<boolean> {
    try {
      const response = await fetch('/api/pickups', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error deleting pickup:', error);
      return false;
    }
  },

  // Get user stats
  async getUserStats(userId?: string): Promise<any> {
    try {
      const url = userId ? `/api/stats/user?userId=${userId}` : '/api/stats/user';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user stats');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return {
        totalPickups: 0,
        activePickups: 0,
        totalWeight: 0
      };
    }
  },

  // Get collector stats
  async getCollectorStats(collectorId?: string): Promise<any> {
    try {
      const url = collectorId ? `/api/stats/collector?collectorId=${collectorId}` : '/api/stats/collector';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch collector stats');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching collector stats:', error);
      return {
        totalPickups: 0,
        completedPickups: 0,
        totalWeight: 0
      };
    }
  }
};