// Donation service for managing donations

export interface Donation {
  id: number;
  userId: string;
  ngoId?: string | null;
  itemType: string;
  itemName: string;
  condition: string;
  quantity: number;
  description: string;
  pickupAddress: string;
  contactNumber: string;
  status: 'pending' | 'accepted' | 'rejected' | 'picked-up' | 'delivered';
  createdAt: string;
  updatedAt: string;
}

export const donationService = {
  // Get all donations
  async getDonations(filters?: { status?: string; limit?: number }): Promise<{ donations: Donation[] }> {
    try {
      let url = '/api/donations';
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
        throw new Error('Failed to fetch donations');
      }
      const data = await response.json();
      return { donations: data };
    } catch (error) {
      console.error('Error fetching donations:', error);
      return { donations: [] };
    }
  },

  // Get donation by ID
  async getDonationById(id: number): Promise<Donation | null> {
    try {
      const response = await fetch(`/api/donations?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch donation');
      }
      const data = await response.json();
      return data[0] || null;
    } catch (error) {
      console.error('Error fetching donation:', error);
      return null;
    }
  },

  // Create new donation
  async createDonation(data: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Donation> {
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create donation');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  },

  // Update donation
  async updateDonation(id: number, updates: Partial<Donation>): Promise<Donation | null> {
    try {
      const response = await fetch('/api/donations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updates }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update donation');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating donation:', error);
      return null;
    }
  },

  // Delete donation
  async deleteDonation(id: number): Promise<boolean> {
    try {
      const response = await fetch('/api/donations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error deleting donation:', error);
      return false;
    }
  }
};