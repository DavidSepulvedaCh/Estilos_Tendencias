import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = "";

  constructor(private authService: AuthService) { }

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
}
