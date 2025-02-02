export interface Package {
  _id: string;
  eventId: string;
  packageName: string;
  startingAmnt: number;
  image: string;
  isBlocked: boolean;
  features: Feature[];
  createdAt: string;
  updatedAt?: string; 
}

export interface Feature {
  _id:string,
  name: string;  
  amount: number;  
  isBlocked?: boolean;
}
export interface PackageResponse{
  statusCode: number;
  message: string;
  data: Package []
}