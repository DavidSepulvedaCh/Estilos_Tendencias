import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Estilos & Tendencias';
  logoBanner = '/assets/css/img/logo2.png';
  isLoading: boolean = true;


  constructor(private router: Router) { }

  // Simula la carga de imágenes
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 10000); // Simula un tiempo de carga
  }

  isInAdminPanel(): boolean {
    return this.router.url.includes('/admin');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.7)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
      }
    }
  }
}
