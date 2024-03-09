export interface ILogin {
    user: string;
    password: string;
}

export interface IloginResponse {
    data: IData;
    message: string;
    status: boolean;
  }

  export interface IData {
    id: number;
    username: string;
    dni: string;
    email: string;
    rol: string;
    name: string;
    lastname: string;
    access_token: string;
    operatorId: string;
    operatorKey: string;
    operatorStatus: boolean;
    dashboardId: number;
    referred_state: boolean;


  }