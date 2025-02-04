export interface IAuthAPISucessfullResponse {
  statusCode: number;
  message: string;
  data: {
    _id: string;
    email: string;
  };
}

// this is from 
// export interface IAuthAPISucessfullResponse<T> {
//   statusCode: number;
//   message: string;
//   data: T;
// }

// const demo: IAuthAPISucessfullResponse<{_id:string, email:string}>