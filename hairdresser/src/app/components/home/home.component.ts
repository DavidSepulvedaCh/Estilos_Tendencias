import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    '/assets/css/img/imagen1.jpg',
    '/assets/css/img/imagen2.jpg',
    '/assets/css/img/imagen3.jpg',
    '/assets/css/img/imagen4.jpg',
    '/assets/css/img/imagen5.jpg',
    '/assets/css/img/imagen6.jpg',
  ];

  logoBanner = '/assets/css/img/logo2.png';
  picture = '/assets/css/img/picture.jpg';
}
