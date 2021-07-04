import {Component, OnInit} from '@angular/core';
import {darkTheme, lightTheme, Mode} from './model';
import {StyleManagerService} from '../services/style-manager.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  mode: Mode = lightTheme;

  constructor(private styleManager: StyleManagerService) {
  }

  ngOnInit(): void {
  }

  changeMode() {
    this.mode = this.mode.tag === 'light' ? darkTheme : lightTheme;
    this.styleManager.setStyle(
      'theme',
      `assets/${this.mode.materialTheme}.css`
    );
  }
}
