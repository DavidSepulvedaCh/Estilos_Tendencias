import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770525/imagen1_max66y.jpg',
    'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770527/imagen2_edwoya.jpg',
    'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770541/imagen3_uv0zmk.jpg',
    'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770543/imagen4_gvnxvw.jpg',
    'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770521/imagen5_hnft1o.jpg',
    'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770545/imagen6_wpqkeo.jpg',
  ];

  logoBanner = 'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770522/logo2_gwgtgz.png';
  picture = 'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770543/picture_qw6z9k.jpg';
}
