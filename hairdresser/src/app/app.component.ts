import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthGuard } from './guards/authGuard.service';
import { CarshoppingService } from './services/carshopping.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconRegistryService } from './services/icon-registry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Estilos & Tendencias';
  logoBanner =
    'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770522/logo2_gwgtgz.png';
  isLoading: boolean = true;
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private auth: AuthGuard,
    private carShoppingService: CarshoppingService,
    private iconRegistryService: IconRegistryService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 10000);

    this.carShoppingService.carItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
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

}
