export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  phone: string;
  address: string;
  achievements: string[];
  sellerRating: number;
  buyerRating: number;
  isVerified: boolean;
  isPremium: boolean;
  balance: number;
  joinedDate: string;
}

export interface BidItem {
  id: string;
  bidderName: string;
  amount: number;
  time: string;
  isUser: boolean;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  category: string;
  startingPrice: number;
  currentBid: number;
  increment: number;
  currentBidderId?: string;
  currentBidderName?: string;
  biddersCount: number;
  startTime: number; // timestamp
  endTime: number; // timestamp
  status: 'active' | 'won' | 'lost' | 'ended' | 'pending_payment' | 'paid' | 'shipped' | 'delivered';
  image: string;
  gallery: string[];
  condition: 'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';
  seller: {
    name: string;
    rating: number;
    avatar: string;
    isVerified: boolean;
  };
  views: number;
  likes: number;
  bidsHistory: BidItem[];
  isWatched?: boolean;
  isFavorited?: boolean;
}

export interface ShipmentTimelineEvent {
  status: 'confirmed' | 'packed' | 'dispatched' | 'in_transit' | 'clearance' | 'out_for_delivery' | 'delivered';
  time: string;
  location: string;
  description: string;
}

export interface Shipment {
  id: string;
  auctionId: string;
  auctionTitle: string;
  auctionImage: string;
  trackingNumber: string;
  status: 'confirmed' | 'packed' | 'dispatched' | 'in_transit' | 'clearance' | 'out_for_delivery' | 'delivered';
  estimatedDelivery: string;
  timeline: ShipmentTimelineEvent[];
  carrier: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'outbid' | 'won' | 'shipment' | 'payment_reminder' | 'ending_soon' | 'general';
  time: string; // readable e.g., "2 min ago"
  read: boolean;
  auctionId?: string;
}

export interface Transaction {
  id: string;
  auctionId?: string;
  auctionTitle?: string;
  amount: number;
  type: 'payment' | 'topup';
  status: 'success' | 'failed';
  date: string;
}

export interface SupportMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}
