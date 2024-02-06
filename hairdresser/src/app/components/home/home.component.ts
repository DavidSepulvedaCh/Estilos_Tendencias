import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  posts = [
    {
      "image": "https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770525/imagen1_max66y.jpg",
      "category": "Instalaciones",
      "description": "Tenemos las mejores instalaciones para que tengas una experiencia única."
    },
    {
      "image": "https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770527/imagen2_edwoya.jpg",
      "category": "Tienda",
      "description": "Contamos con la sección de tienda, donde ofrecemos productos para tu cuidado de imagen."
    },
    {
      "image": "https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770521/imagen5_hnft1o.jpg",
      "category": "Profesionales",
      "description": "Tenemos a los mejores barberos y estilistas a disposición tuya."
    }
  ];


  logo = 'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705881980/logo_gscciq.png';
  logoBanner = 'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770522/logo2_gwgtgz.png';
  picture = 'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770543/picture_qw6z9k.jpg';
}
