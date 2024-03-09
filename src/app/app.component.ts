import { Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
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
  constructor(private tokenService: TokenService) {}

  isAuth: boolean = false;
  subscription!: Subscription;

  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
  ngOnInit(): void {
    // Suscripción al BehaviorSubject
    this.subscription = this.tokenService.isAuthentication.subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    );
  }
}
