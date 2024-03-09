import { Component, Input, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';
import {
  menuItemsAdmin,
  menuItemsUser,
} from '../models/sidenav/menuItems.data';
import { MenuItem } from '../models/sidenav/sidenav';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  // isRol$;
  subscription!: Subscription;
  isRol: string = '';
  menuItems = signal<MenuItem[]>([]);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscripción al BehaviorSubject
    this.subscription = this.authService.isRol.subscribe((isRol: string) => {
      this.isRol = isRol;
      if (this.isRol == 'Estudiante') {
        this.menuItems = menuItemsUser;
      } else {
        this.menuItems = menuItemsAdmin;
      }
    });
    console.log('###');
    console.log(this.isRol);
  }
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '45' : '100'));
}
