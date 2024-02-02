import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthGuard } from "./services/authGuard.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Estilos & Tendencias';
  logoBanner = 'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770522/logo2_gwgtgz.png';
  isLoading: boolean = true;


  constructor(private router: Router, private auth: AuthGuard) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 10000);
  }



  isInAdminPanel(): boolean {
    return this.router.url.includes('/admin');
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
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

  toggleMenu() {
    const menu = document.querySelector('header ul');
    menu!.classList.toggle('show');
  }

}
