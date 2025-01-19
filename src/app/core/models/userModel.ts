export interface User {
  userId: string;
  _id: string;
  name: string;
  email: string;
  mobile: string;
  status: boolean;
  password: string;
  imageUrl: string;
}

export interface IUserregister {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  message?: string;
}

export interface LogOut {
  message: string;
}
