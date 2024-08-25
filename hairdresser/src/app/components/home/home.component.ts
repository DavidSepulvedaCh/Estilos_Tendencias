import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Supplier } from 'src/app/models/supplier';
import { Post } from 'src/app/models/post';
import { SupplierService } from 'src/app/services/supplier.service';
import { PostService } from 'src/app/services/post.service';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SupplierService, PostService],
})
export class HomeComponent implements OnInit {
  constructor(
    private _supplierService: SupplierService,
    private _postService: PostService
  ) {}

  public suppliers: Supplier[] = [];
  public posts: Post[] = [];

  logo =
    'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705881980/logo_gscciq.png';
  logoBanner =
    'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770522/logo2_gwgtgz.png';
  picture =
    'https://res.cloudinary.com/dwfh4s7tu/image/upload/v1705770543/picture_qw6z9k.jpg';

  ngOnInit(): void {
    this._supplierService.getSuppliers().subscribe(
      (data: any) => {
        if (data && data.Suppliers && Array.isArray(data.Suppliers)) {
          this.suppliers = data.Suppliers.map((supplier: any) => ({
            id: supplier.id,
            name: supplier.name,
            category: supplier.category,
            image: supplier.image,
          }));
        } else {
          console.error(
            'La estructura de datos de la API no coincide con la esperada'
          );
        }
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );

    this._postService.getPosts().subscribe(
      (data: any) => {
        if (data && data.Posts && Array.isArray(data.Posts)) {
          console.log('Publicaciones obtenidas:', data.Posts);
          this.posts = data.Posts.map((post: any) => ({
            id: post.id,
            name: post.name,
            description: post.description,
            image: post.image,
          }));
        } else {
          console.error(
            'La estructura de datos de la API no coincide con la esperada'
          );
        }
      },
      (error) => {
        console.error('Error al obtener las publicaciones:', error);
      }
    );
  }
}
