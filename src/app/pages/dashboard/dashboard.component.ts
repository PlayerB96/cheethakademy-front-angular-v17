import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: '#1F2937' },
    { text: 'Two', cols: 1, rows: 2, color: '#1F2937' },
    { text: 'Three', cols: 1, rows: 1, color: '#1F2937' },
    { text: 'Four', cols: 2, rows: 1, color: '#1F2937' },
  ];
}
