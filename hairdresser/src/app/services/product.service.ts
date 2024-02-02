import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiURL = environment.apiUrl;

    public Products: Array<Product>;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.Products = [];
    }

    addProduct(productData: FormData): Observable<any> {
        const options = {
            headers: {
                'Authorization': this.authService.getToken(),
            }
        };

        return this.http.post<any>(`${this.apiURL}/product/save-product`, productData, options);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiURL}/product/getProducts`);
    }

    updateProduct(id: string, params: FormData): Observable<Product> {
        const options = {
            headers: {
                'Authorization': this.authService.getToken(),
            }
        };

        console.log("FormData values:");
        params.forEach((value, key) => {
            console.log(key, value);
        });

        return this.http.put<Product>(`${this.apiURL}/product/update-product/${id}`, params, options);
    }

    deleteProduct(id: string): Observable<any> {
        const options = {
            headers: {
                'Authorization': this.authService.getToken(),
            }
        };

        return this.http.delete<any>(`${this.apiURL}/product/delete-product/${id}`, options);
    }

}
