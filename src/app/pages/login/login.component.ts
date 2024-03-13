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
    private router: Router
  ) {
    /* Formulario de Inicio de Sesión */
    this.loginForm = this.fb.group({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /* Enviar formulario de Inicio de Sesión al API */
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      // this.authService.onLogin(this.loginForm.value).subscribe({
      /* Validación para usuario válido */
      // next: (value) => {
      this.router.navigate(['dashboard']);
      // },
      /* Validación de errores 'usuario invalido(401) - server mantenimiento(500) */
      // error: (error) => {
      //   this.statusSubmit = error.error.status;
      //   if (error.status === 401) {
      //     this.messageError = error.error.message;
      //   }
      // },
      // });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
