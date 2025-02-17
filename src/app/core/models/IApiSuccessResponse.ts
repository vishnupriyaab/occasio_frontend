export interface IAuthAPISucessfullResponse {
  statusCode: number;
  message: string;
  data: {
    _id: string;
    email: string;
  };
}