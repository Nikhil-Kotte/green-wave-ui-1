// Statistics service for system-wide stats
export const statsService = {
  // Get system-wide statistics (for admin)
  async getSystemStats(): Promise<any> {
    try {
      const response = await fetch('/api/stats/system');
      
      if (!response.ok) {
        throw new Error('Failed to fetch system stats');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching system stats:', error);
      return {
        totalUsers: 0,
        totalPickups: 0,
        totalWeight: 0,
        activeRoutes: 0
      };
    }
  },

  // Get user statistics
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

  // Get collector statistics
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