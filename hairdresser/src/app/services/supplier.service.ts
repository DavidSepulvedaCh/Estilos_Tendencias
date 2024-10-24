import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiURL = environment.apiUrl;

  public Suppliers: Array<Supplier>;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.Suppliers = [];
  }

  addSupplier(supplierData: FormData): Observable<any> {
    const options = {
      headers: {
        Authorization: this.authService.getToken(),
      },
    };

    console.log('FormData values:');
    supplierData.forEach((value, key) => {
      console.log(key, value);
    });

    return this.http.post<any>(
      `${this.apiURL}/supplier/save-supplier`,
      supplierData,
      options
    );
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiURL}/supplier/get-suppliers`);
  }

  /* updateSupplier(id: string, params: FormData): Observable<Supplier> {
        const options = {
            headers: {
                'Authorization': this.authService.getToken(),
            }
        };

        console.log("FormData values:");
        params.forEach((value, key) => {
            console.log(key, value);
        });

        return this.http.put<Supplier>(`${this.apiURL}/supplier/update-Supplier/${id}`, params, options);
    } */

  deleteSupplier(id: string): Observable<any> {
    const options = {
      headers: {
        Authorization: this.authService.getToken(),
      },
    };

    return this.http.delete<any>(
      `${this.apiURL}/supplier/delete-supplier/${id}`,
      options
    );
  }
}
