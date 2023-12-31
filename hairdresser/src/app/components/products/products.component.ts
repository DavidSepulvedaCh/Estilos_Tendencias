import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  public uniqueCategories: string[] = [];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      (data: any) => {
        if (data && data.Products && Array.isArray(data.Products)) {
          this.products = data.Products;
          console.log(this.products);
          this.uniqueCategories = this.getUniqueCategories();
        } else {
          console.error('La estructura de datos de la API no coincide con la esperada');
        }
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  activeCategory: string | null = null;
  activeId: boolean = false;

  changeCategory(category: string | null): void {
    this.activeCategory = category;
    this.activeId = !this.activeId;
  }

  filteredProducts(): Product[] {
    return this.activeCategory === null
      ? this.products
      : this.products.filter(product => product.category === this.activeCategory);
  }

  // Función para obtener categorías únicas
  getUniqueCategories(): string[] {
    const categoriesSet = new Set<string>();
    if (Array.isArray(this.products)) {
      this.products.forEach(product => {
        if (product.category) {
          categoriesSet.add(product.category);
        }
      });
    }
    return Array.from(categoriesSet);
  }
}
