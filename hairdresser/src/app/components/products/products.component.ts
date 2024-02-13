import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CarshoppingService } from 'src/app/services/carshopping.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  public productsCount: number = 0;
  public uniqueCategories: string[] = [];
  public loading: boolean = true;
  public car: Product[] = [];

  constructor(private _productService: ProductService, private _carShoppingService: CarshoppingService) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      (data: any) => {
        if (data && data.Products && Array.isArray(data.Products)) {
          this.products = data.Products.map((product: any) => ({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            image: product.image,
          }));
          this.uniqueCategories = this.getUniqueCategories();
          this.loading = false;
        } else {
          console.error('La estructura de datos de la API no coincide con la esperada');
        }
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
        this.loading = false;
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

  addToCart(product: Product): void {
    this.car.push(product);
    this._carShoppingService.addCarshopping(product).subscribe(
      (data: any) => {
        console.log('Producto añadido al carrito:', data);

      },
      (error) => {
        console.error('Error al añadir producto al carrito:', error);
      }
    );
  }
}
