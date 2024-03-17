import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IData } from '../../models/auth/auth';
import { constants } from '../../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {
    const token = this.getToken();
    if (token) {
      this.updateToken(true);
    }
  }

  /* Validaciones con el Token de inicio de Sesión sin conexion a API*/
  updateTokenLocal(status: boolean) {
    this.isAuthentication.next(status);
  }

  /* Validaciones con el Token de inicio de Sesión*/
  updateToken(status: boolean) {
    this.isAuthentication.next(status);
  }

  setToken(token: string) {
    this.updateToken(true);
    localStorage.setItem(constants.CURRENT_TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(constants.CURRENT_TOKEN) || null;
  }

  removeToken() {
    this.updateToken(false);
    return localStorage.removeItem(constants.CURRENT_TOKEN);
  }

  /* Validaciones con los Datos del Usuario */
  setDataUser(response: IData) {
    this.updateToken(true);
    localStorage.setItem(constants.DATA_USER, JSON.stringify(response));
  }
}
