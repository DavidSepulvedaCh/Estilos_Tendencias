import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products = [
    {
      id: 1,
      type: 'Keratinas',
      name: 'Producto 1',
      description: 'Descripción del Producto 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: '$19.99',
      imageUrl: '../../../assets/css/img/imagen1.jpg'
    },
    {
      id: 2,
      type: 'Barberia',
      name: 'Producto 2',
      description: 'Descripción del Producto 2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: '$24.99',
      imageUrl: '../../../assets/css/img/imagen2.jpg'
    },
    {
      id: 2,
      type: 'Shampoos',
      name: 'Producto 2',
      description: 'Descripción del Producto 2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: '$24.99',
      imageUrl: '../../../assets/css/img/imagen3.jpg'
    },
  ];

  activeCategory: string | null = null; // Categoría inicial (mostrar todos los productos)
  activeId: boolean = false;
  changeCategory(category: string | null): void {
    this.activeCategory = category;
    this.activeId = !this.activeId;
  }

  filteredProducts(): any[] {
    if (this.activeCategory === null) {
      return this.products; // Mostrar todos los productos
    } else {
      return this.products.filter(product => product.type === this.activeCategory);
    }
  }
}
