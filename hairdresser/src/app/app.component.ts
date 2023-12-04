import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Estilos & Tendencias';

  constructor(private router: Router) { }

  isInAdminPanel(): boolean {
    return this.router.url.includes('/admin'); // Actualiza la lógica según tu configuración de rutas
  }
}
