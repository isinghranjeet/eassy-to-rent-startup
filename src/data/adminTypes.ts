export interface PGListing {
  id: string;
  slug: string;
  name: string;
  address: string;
  price: number;
  originalPrice?: number;
  type: 'boys' | 'girls' | 'co-ed';
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  amenities: string[];
  roomTypes: string[];
  distance: string;
  availability: 'available' | 'limited' | 'full';
  verified: boolean;
  featured: boolean;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  total: number;
  published: number;
  draft: number;
  featured: number;
  verified: number;
  boys: number;
  girls: number;
  coed: number;
}