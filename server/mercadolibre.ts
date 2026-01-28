import axios, { AxiosInstance } from 'axios';

/**
 * Mercado Libre API Integration
 * Handles OAuth, token refresh, and API calls
 */

export interface MLAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user_id: string;
}

export interface MLUserInfo {
  id: string;
  nickname: string;
  email: string;
  site_id: string;
}

export interface MLMetrics {
  sales: {
    period: string;
    total: number;
    completed: number;
    canceled: number;
  };
  claims: {
    period: string;
    rate: number;
  };
  reputation: {
    level_id: string;
    power_seller_status: string;
    transactions: {
      canceled: number;
      completed: number;
      period: string;
      ratings: {
        negative: number;
        neutral: number;
        positive: number;
      };
      total: number;
    };
  };
}

export class MercadoLibreAPI {
  private client: AxiosInstance;
  private accessToken: string;
  
  constructor(accessToken: string, siteId: string = 'MLA') {
    this.accessToken = accessToken;
    this.client = axios.create({
      baseURL: 'https://api.mercadolibre.com',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Exchange authorization code for access tokens
   */
  static async getTokens(code: string, clientId: string, clientSecret: string, redirectUri: string): Promise<MLAuthTokens> {
    const response = await axios.post('https://api.mercadolibre.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri
    });

    return response.data;
  }

  /**
   * Refresh access token
   */
  static async refreshToken(refreshToken: string, clientId: string, clientSecret: string): Promise<MLAuthTokens> {
    const response = await axios.post('https://api.mercadolibre.com/oauth/token', {
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken
    });

    return response.data;
  }

  /**
   * Get user information
   */
  async getUserInfo(userId: string): Promise<MLUserInfo> {
    const response = await this.client.get(`/users/${userId}`);
    return {
      id: response.data.id,
      nickname: response.data.nickname,
      email: response.data.email,
      site_id: response.data.site_id
    };
  }

  /**
   * Get user reputation and metrics
   */
  async getUserReputation(userId: string): Promise<any> {
    const response = await this.client.get(`/users/${userId}/reputation`);
    return response.data;
  }

  /**
   * Get orders for a seller
   */
  async getOrders(sellerId: string, params: {
    offset?: number;
    limit?: number;
    sort?: string;
    order?: string;
  } = {}): Promise<any> {
    const response = await this.client.get(`/orders/search`, {
      params: {
        seller: sellerId,
        offset: params.offset || 0,
        limit: params.limit || 50,
        sort: params.sort || 'date_desc',
        order: params.order
      }
    });

    return response.data;
  }

  /**
   * Get claims for a seller
   */
  async getClaims(sellerId: string): Promise<any> {
    const response = await this.client.get(`/claims/search`, {
      params: {
        seller_id: sellerId
      }
    });

    return response.data;
  }

  /**
   * Get active listings for a seller
   */
  async getActiveListings(sellerId: string, offset: number = 0, limit: number = 50): Promise<any> {
    const response = await this.client.get(`/users/${sellerId}/items/search`, {
      params: {
        status: 'active',
        offset,
        limit
      }
    });

    return response.data;
  }

  /**
   * Get item details
   */
  async getItem(itemId: string): Promise<any> {
    const response = await this.client.get(`/items/${itemId}`);
    return response.data;
  }

  /**
   * Get questions for a seller
   */
  async getQuestions(sellerId: string, status: string = 'UNANSWERED'): Promise<any> {
    const response = await this.client.get(`/questions/search`, {
      params: {
        seller_id: sellerId,
        status
      }
    });

    return response.data;
  }

  /**
   * Calculate metrics from ML data
   */
  async calculateMetrics(userId: string): Promise<{
    cancellationRate: number;
    claimRate: number;
    avgResponseTime: number;
    outOfStockCount: number;
    reputationScore: number;
  }> {
    try {
      // Get reputation data
      const reputation = await this.getUserReputation(userId);
      
      // Get recent orders
      const orders = await this.getOrders(userId, { limit: 100 });
      
      // Get claims
      const claims = await this.getClaims(userId);
      
      // Get listings
      const listings = await this.getActiveListings(userId, 0, 100);

      // Calculate cancellation rate
      const totalOrders = orders.paging?.total || 0;
      const canceledOrders = orders.results?.filter((o: any) => o.status === 'cancelled').length || 0;
      const cancellationRate = totalOrders > 0 ? (canceledOrders / totalOrders) * 100 : 0;

      // Calculate claim rate
      const totalClaims = claims.paging?.total || 0;
      const claimRate = totalOrders > 0 ? (totalClaims / totalOrders) * 100 : 0;

      // Get reputation score (0-100)
      const reputationScore = reputation.seller_reputation?.level_id === 'green' ? 80 :
                              reputation.seller_reputation?.level_id === 'yellow' ? 60 :
                              reputation.seller_reputation?.level_id === 'orange' ? 40 :
                              reputation.seller_reputation?.level_id === 'red' ? 20 : 50;

      // Count out of stock items
      const outOfStockCount = listings.results?.filter((item: any) => 
        item.available_quantity === 0 || item.status === 'paused'
      ).length || 0;

      // Average response time (placeholder - would need questions API)
      const avgResponseTime = 120; // minutes

      return {
        cancellationRate: Number(cancellationRate.toFixed(2)),
        claimRate: Number(claimRate.toFixed(2)),
        avgResponseTime,
        outOfStockCount,
        reputationScore
      };
    } catch (error) {
      console.error('Error calculating metrics:', error);
      throw error;
    }
  }
}

/**
 * Generate OAuth authorization URL
 */
export function getMLAuthUrl(clientId: string, redirectUri: string, state?: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    ...(state && { state })
  });

  return `https://auth.mercadolibre.com.ar/authorization?${params.toString()}`;
}

/**
 * Check if token needs refresh (refresh 1 hour before expiry)
 */
export function shouldRefreshToken(expiresAt: Date): boolean {
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
  return expiresAt <= oneHourFromNow;
}
