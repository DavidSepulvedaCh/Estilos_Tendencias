import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = "";
  openMenus: { [key: string]: boolean } = {};

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (userInfo) => {
        if (userInfo && userInfo.user.name) {
          this.username = userInfo.user.name;
        }
      },
      (error) => {
        console.error('Ocurrió un error al obtener la información del usuario.');
      }
    );

  }

  toggleMenu(menu: string): void {
    this.openMenus[menu] = !this.openMenus[menu];
  }

  isMenuOpen(menu: string): boolean {
    return this.openMenus[menu];
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
