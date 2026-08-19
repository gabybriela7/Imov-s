export type InterestType = 
  | 'compra'
  | 'visita'
  | 'financiamento'
  | 'investimento'
  | 'material';

export interface Property {
  id: string;
  code: string;
  name: string;
  badge: string;
  badgeColor: string;
  neighborhood: string;
  city: string;
  fullAddress: string;
  propertyType: 'Sobrado' | 'Apartamento';
  price: number;
  condoFee?: number;
  iptuAnnual?: number;
  area: number; // m²
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpots: number;
  status: 'Pronto para Morar' | 'Em Construção' | 'Excelente Estado';
  summary: string;
  description: string;
  highlights: string[];
  features: string[];
  images: string[];
  vivaRealUrl: string;
  googleFormUrl: string;
  defaultInterestLabel: string;
  defaultInterestType: InterestType;
  investmentYieldEstimate?: string;
  rentalEstimate?: number;
}

export interface LeadFormData {
  propertyId: string;
  propertyTitle: string;
  neighborhood: string;
  interestType: InterestType;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  preferredDate?: string;
  preferredTime?: 'manha' | 'tarde' | 'noite';
  visitType?: 'presencial' | 'video';
  downPayment?: number;
  installmentMonths?: number;
  hasTradeIn?: boolean;
  offerPrice?: number;
}
