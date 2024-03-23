import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../core/services/auth/token.service';
import { constants } from '../../constants/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  messageError: string = '';
  statusSubmit: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {
    /* Formulario de Inicio de Sesión */
    this.loginForm = this.fb.group({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /* Enviar formulario de Inicio de Sesión sin el API */
  // onSubmit() {
  //   this.router.navigate(['dashboard']);
  //   this.tokenService.updateTokenLocal(true);
  //   localStorage.setItem(
  //     constants.DATA_USER,
  //     JSON.stringify({
  //       id: 1,
  //       username: 'bryan',
  //       name: 'Bryan',
  //       rol: 'Estudiante',
  //       email: 'player.b.1996@gmail.com',
  //       lastname: 'Rafael',
  //       operatorId: '0.0.1602',
  //       operatorKey:
  //         '302e020100300506032b6570042204201035935f406bd29f6e4128b2f86ae7c7fca24a5c9ee88413fa37f7502f969110',
  //       dashboardId: 1,
  //     })
  //   );
  // }

  /* Enviar formulario de Inicio de Sesión al API */
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.authService.onLogin(this.loginForm.value).subscribe({
        /* Validación para usuario válido */
        next: (value) => {
          this.router.navigate(['dashboard']);
        },
        /* Validación de errores 'usuario invalido(401) - server mantenimiento(500) */
        error: (error) => {
          this.statusSubmit = error.error.status;
          if (error.status === 401) {
            this.messageError = error.error.message;
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
