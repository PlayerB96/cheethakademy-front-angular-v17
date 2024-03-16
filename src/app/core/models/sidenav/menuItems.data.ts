import { signal } from '@angular/core';
import { MenuItem } from './sidenav';

export const menuItemsUser = signal<MenuItem[]>([
  { icon: 'person', label: 'Perfil', route: 'profile' },
  { icon: 'dashboard', label: 'Panel', route: 'dashboard' },
  { icon: 'home', label: 'Inicio', route: 'home' },
]);

export const menuItemsAdmin = signal<MenuItem[]>([
  { icon: 'dashboard', label: 'Panel Admin', route: 'dashboard' },
  { icon: 'home', label: 'Inicio Admin', route: 'home' },
]);
