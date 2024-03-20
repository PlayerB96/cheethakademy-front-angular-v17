import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from '../../../core/models/sidenav/sidenav';
import { IData } from '../../../core/models/auth/auth';
import {
  menuItemsAdmin,
  menuItemsUser,
} from '../../../core/models/sidenav/menuItems.data';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bottomnav',
  standalone: true,
  imports: [
    RouterOutlet,

    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './bottomnav.component.html',
  styleUrl: './bottomnav.component.scss',
})
export class BottomnavComponent {
  menuItems = signal<MenuItem[]>([]);
  dataUser!: IData;

  ngOnInit(): void {
    /* Obtener datos del Usuario */
    const dataUser = localStorage.getItem('DATA_USER');
    if (dataUser != null) {
      this.dataUser = JSON.parse(dataUser) as IData;
      /* Validación de rol en usuario */
      if (this.dataUser.rol == 'Estudiante') {
        this.menuItems = menuItemsUser;
        console.log(this.menuItems);
      } else {
        this.menuItems = menuItemsAdmin;
      }
    }
  }
}
