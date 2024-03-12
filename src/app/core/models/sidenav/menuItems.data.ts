import { signal } from '@angular/core';
import { MenuItem } from './sidenav';

export const menuItemsUser = signal<MenuItem[]>([
  { icon: 'dashboard', label: 'Panel', route: 'dashboard' },
  { icon: 'home', label: 'Inicio', route: 'home' },
  { icon: 'person', label: 'Perfil', route: 'profile' },
]);

export const menuItemsAdmin = signal<MenuItem[]>([
  { icon: 'dashboard', label: 'Panel Admin', route: 'dashboard' },
  { icon: 'home', label: 'Inicio Admin', route: 'home' },
]);
