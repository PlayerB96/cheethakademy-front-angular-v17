import { Component } from '@angular/core';
import { TileProfile } from '../../core/models/profile/profile';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { tilesProfile } from '../../core/models/profile/profile.grid.data';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatGridListModule, CommonModule, FlexLayoutModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  cols$!: Observable<number>;
  tilesProfile = <TileProfile[]>[];
  matchesResponsive!: boolean;

  ngOnInit() {
    /* Validación de Columnas para el Responsive */
    this.cols$ = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(
        map(({ matches }) => {
          this.matchesResponsive = matches;
          return matches ? 3 : 9;
        })
      );
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    /* Obtener los Tiles del Dashboard */
    this.tilesProfile = tilesProfile;
    /* Observar cambios en matchesResponsive */
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(({ matches }) => {
        this.matchesResponsive = matches;
      });
  }

  /* Funciones para modificar clases responsive para los Contenedoress */
  getClassFlexcolHeight() {
    const isResponsive = this.matchesResponsive;
    return {
      flex: !isResponsive,
      'flex-col': isResponsive,
      'h-40': !isResponsive,
      'h-120': isResponsive,
    };
  }

  getClassFlexcol() {
    const isResponsive = this.matchesResponsive;
    return {
      '': !isResponsive,
      'flex-col': isResponsive,
      'pt-4': isResponsive,
    };
  }

  getClassFlexcolFlex() {
    const isResponsive = this.matchesResponsive;
    return {
      flex: !isResponsive,
      'flex-col': isResponsive,
    };
  }

  getClassMyMx() {
    const isResponsive = this.matchesResponsive;
    return {
      'my-2': isResponsive,
      'mx-2': !isResponsive,
    };
  }

  getClassMarginVertical4() {
    const isResponsive = this.matchesResponsive;
    return {
      '': !isResponsive,
      'my-4': isResponsive,
    };
  }
}
