import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, CommonModule, FlexLayoutModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  tiles: Tile[] = [
    { text: 'One', cols: 2, rows: 1, color: '#1F2937' },
    { text: 'Two', cols: 1, rows: 2, color: '#1F2937' },
    { text: 'Three', cols: 1, rows: 1, color: '#1F2937' },
    { text: 'Four', cols: 2, rows: 1, color: '#1F2937' },
  ];

  cols$: Observable<number>;

  constructor(private breakpointObserver: BreakpointObserver) {
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
