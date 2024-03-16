import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TileDashboard } from '../../core/models/dashboard/dashboard';
import { tilesDashboard } from '../../core/models/dashboard/dashboard.grid.data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, CommonModule, FlexLayoutModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  cols$: Observable<number>;
  tilesDashboard = <TileDashboard[]>[];

  constructor(private breakpointObserver: BreakpointObserver) {
    /* Obtener los Tiles del Dashboard */
    this.tilesDashboard = tilesDashboard;
    /* Validación de Columnas para el Responsive */
    this.cols$ = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(
        map(({ matches }) => {
          if (matches) {
            return 2;
          }
          return 4;
        })
      );
  }
}
