import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'App Security';
  typeSelected: string = 'ball-atom';
  textoSpinner: string = 'Cargando...';
}
