import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class WorkService {
    private apiURL = environment.apiUrl;
    constructor(private http: HttpClient, private authService: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'authorization': token
        });
    }

    getWorks(): Observable<any> {
        const headers = this.getHeaders();
        const options = { headers: headers };
        return this.http.get<any>(`${this.apiURL}/work/get-services`, options);
    }

}