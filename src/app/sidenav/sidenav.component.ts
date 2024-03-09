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
  subscription!: Subscription;
  isRol: string = '';
  menuItems = signal<MenuItem[]>([]);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    /* Validación de rol en usuario */
    this.subscription = this.authService.isRol.subscribe((isRol: string) => {
      this.isRol = isRol;
      /* Mostrar menuItems de SideNav de acuerdo a Rol */
      if (this.isRol == 'Estudiante') {
        this.menuItems = menuItemsUser;
      } else {
        this.menuItems = menuItemsAdmin;
      }
    });
  }

  /* Manejo de la lógica del collapsed del sideNav */
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  profilePicSize = computed(() => (this.sideNavCollapsed() ? '45' : '100'));
}
