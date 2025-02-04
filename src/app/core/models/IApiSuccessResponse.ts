export interface IAuthAPISucessfullResponse {
  statusCode: number;
  message: string;
  data: {
    _id: string;
    email: string;
  };
}

// export interface IAuthAPISucessfullResponse<T> {
//   statusCode: number;
//   message: string;
//   data: T;
// }

// const demo: IAuthAPISucessfullResponse<{_id:string, email:string}>