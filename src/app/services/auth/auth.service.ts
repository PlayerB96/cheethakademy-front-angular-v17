import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ILogin, IloginResponse } from '../../models/auth/auth';
import { apiEndpoint } from '../../constants/constants';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private tokenService: TokenService, private http: HttpClient) {}
  isRol: BehaviorSubject<string> = new BehaviorSubject<string>('');
  onLogin(data: ILogin) {
    return this.http
      .post<IloginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        map((response) => {
          if (response) {
            this.tokenService.setToken(response.data.operatorId);
            this.isRol.next(response.data.rol);
          }
        })
      );
  }
}
