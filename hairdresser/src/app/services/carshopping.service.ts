import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarshoppingService {
  private carItemCountSubject = new BehaviorSubject<number>(0);
  carItemCount$ = this.carItemCountSubject.asObservable();
  products: Product[] = [];
  public car: Product[] = [];
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  getProducts(email: string): Observable<Product[]> {
    return this.http
      .post<Product[]>(`${this.apiUrl}/shopping/car-shopping`, { email })
      .pipe(
        catchError((error) => {
          console.error('Error getting products: ', error);
          return throwError(error);
        })
      );
  }

  addToCart(product: Product): void {
    const existingProduct = this.car.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct = { ...product, quantity: 1 };
      this.car.push(newProduct);
      console.log('carro: ', this.car);
    }
    this.updateItemCount();
    this._snackBar.open('Producto agregado al carrito con éxito', 'Cerrar', {
      duration: 3000,
    });
  }

  saveCart(email: string): Observable<any> {
    const cartData = this.products.map((product) => ({
      id: product.id,
      quantity: product.quantity,
    }));
    return this.http
      .post(`${this.apiUrl}/shopping/save-cart`, { email, cart: cartData })
      .pipe(
        catchError((error) => {
          console.error('Error saving cart: ', error);
          return throwError(error);
        })
      );
  }

  deleteCarshopping(
    productID: string,
    email: string,
    isAll: boolean = false
  ): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/shopping/delete-product`, {
        productID,
        email,
        isAll,
      })
      .pipe(
        catchError((error) => {
          console.error('Error deleting product from cart: ', error);
          return throwError(error);
        })
      );
  }

  updateQuantity(
    productID: string,
    quantity: number,
    email: string
  ): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/shopping/update-quantity`, {
        productID,
        quantity,
        email,
      })
      .pipe(
        catchError((error) => {
          console.error('Error updating product quantity: ', error);
          return throwError(error);
        })
      );
  }

  updateItemCount(): void {
    this.carItemCountSubject.next(this.car.length);
  }
}
