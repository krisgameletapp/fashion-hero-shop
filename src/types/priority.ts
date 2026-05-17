export type SellerTier = 'standard' | 'negotiated' | 'top-margin' | 'priority';
export type UserRole = 'buyer' | 'seller';

export interface PriorityRep {
  id: string;
  name: string;
  initials: string;
}
