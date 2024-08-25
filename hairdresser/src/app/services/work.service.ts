import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: token,
    });
  }

  addService(serviceData: FormData): Observable<any> {
    const options = { headers: this.getHeaders() };

    return this.http.post<any>(
      `${this.apiURL}/work/add-service`,
      serviceData,
      options
    );
  }

  getServices(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/work/get-services`, { headers: this.getHeaders() });
  }

  updateService(id: string, params: FormData): Observable<Service> {
    const options = { headers: this.getHeaders() };

    console.log('ID', id);

    return this.http.put<Service>(
      `${this.apiURL}/work/update-service/${id}`,
      params,
      options
    );
  }

  deleteService(id: string): Observable<any> {
    const options = { headers: this.getHeaders() };

    return this.http.delete<any>(
      `${this.apiURL}/work/delete-service/${id}`,
      options
    );
  }
}
