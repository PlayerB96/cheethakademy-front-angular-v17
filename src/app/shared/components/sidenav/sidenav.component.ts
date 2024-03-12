import { Component, Input, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../core/services/auth/auth.service';
import { MenuItem } from '../../../core/models/sidenav/sidenav';
import { IData } from '../../../core/models/auth/auth';
import {
  menuItemsAdmin,
  menuItemsUser,
} from '../../../core/models/sidenav/menuItems.data';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  subscription!: Subscription;
  dataUser!: IData;

  isRol: string = '';
  menuItems = signal<MenuItem[]>([]);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    /* Obtener datos del Usuario */
    const dataUser = localStorage.getItem('DATA_USER');
    if (dataUser != null) {
      this.dataUser = JSON.parse(dataUser) as IData;
      /* Validación de rol en usuario */
      if (this.dataUser.rol == 'Estudiante') {
        this.menuItems = menuItemsUser;
      } else {
        this.menuItems = menuItemsAdmin;
      }
    }
  }

  /* Manejo de la lógica del collapsed del sideNav */
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
}
