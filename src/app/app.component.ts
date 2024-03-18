import {
  Component,
  HostBinding,
  OnInit,
  computed,
  effect,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Observable, Subscription, map } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { TokenService } from './core/services/auth/token.service';
import { AuthService } from './core/services/auth/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BottomnavComponent } from './shared/components/bottomnav/bottomnav.component';

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
    LoginComponent,
    BottomnavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    /* mantener en LocalStorage el modo oscuro la proxima vez que se inicia sesión */
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });

    /* Observar cambios en matchesResponsive */
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(({ matches }) => {
        this.matchesResponsive = matches;
      });
  }

  cols$!: Observable<number>;
  matchesResponsive!: boolean;

  isAuth: boolean = false;
  subscription!: Subscription;

  /* Configuraciones para el uso del DarkMode con Tailwind */
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );
  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  ngOnInit(): void {
    /* Validación de Sesión para el cambio de Vista 'Login-Dashboard(Sidenav)' */
    this.subscription = this.tokenService.isAuthentication.subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    );

    /* Validación de BottonNavigation/SideNavigation para el Responsive */
    this.cols$ = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(
        map(({ matches }) => {
          this.matchesResponsive = matches;
          return matches ? 3 : 9;
        })
      );
  }

  /* Cerrar Sesión y redirigir al Login */
  onLogout() {
    this.authService.onLogout();
    this.router.navigate(['']);
  }

  /* Manejo de la lógica del collapsed del sideNav */
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
}
