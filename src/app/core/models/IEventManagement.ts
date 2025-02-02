export interface EventData {
  id: string;
  eventName: string;
  description: string;
  imageUrl?: string;
  isBlocked: boolean; 
  createdAt: string;
  updatedAt?: string; 
}

export interface EventResponse {
  statusCode: number;
  message: string;
  data: EventData[]; 
}

export interface SearchEventResponse {
  data: EventData[];  
  totalCount: number;
  message: string;
  statusCode: number;
}