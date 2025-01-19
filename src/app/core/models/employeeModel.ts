export interface Employee {
    _id?: string;
    employeeId?: string;
    name: string;
    email?: string;
    mobile: string;
    EventId: string;
    is_employee?: 'Approved' | 'Pending' | 'Rejected';
    password?: string;
  }

  export interface IEmployeeregister {
    eName: string;
    email: string;
    mobile:string;
    password: string;
  }

export interface LoginResponse {
    token: string;
    employee: Employee;
  }

  export interface LogoutResponse {
    message: string;
  }