import { Component, OnInit, computed, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { TokenService } from './services/auth/token.service';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidenavComponent,
    RouterOutlet,
    HomeComponent,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  isAuth: boolean = false;
  subscription!: Subscription;

  ngOnInit(): void {
    /* Validación de Sesión para el cambio de Vista 'Login-Dashboard(Sidenav)' */
    this.subscription = this.tokenService.isAuthentication.subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    );
  }

  onLogout() {
    this.authService.onLogout();
    this.router.navigate(['']);
  }

  /* Manejo de la lógica del collapsed del sideNav */
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
}
