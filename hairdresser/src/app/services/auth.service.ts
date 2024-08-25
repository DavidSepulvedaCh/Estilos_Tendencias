import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    register(userData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/user/register`, userData);
    }

    login(email: string, password: string): Observable<any> {
        const data = {
            email: email,
            password: password,
        };
        return this.http.post<any>(`${this.apiUrl}/user/login`, data).pipe(
            tap(response => {
                if (response) {
                    this.setCredentials(email, response.tokenUsuario);
                }
            }),
            catchError(error => {
                console.error('Error en la solicitud de inicio de sesión:', error);
                throw error;
            })
        );
    }


    getUserInfo(): Observable<any> {
        const token = this.getToken();

        if (!token) {
            return of(null);
        }
        const headers = new HttpHeaders({
            'Authorization': `${token}`
        });

        return this.http.post<any>(`${this.apiUrl}/user/information`, {}, { headers });
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/user/forgot-password`, { email });
    }

    resetPassword(token: string, newPassword: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `${token}`
        });

        const data = { newPassword };
        return this.http.put<any>(`${this.apiUrl}/user/new-password`, data, { headers }).pipe(
            tap(response => {
                if (response) {
                    this.logOut();
                }
            }),
        );
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token') || '';
    }

    setCredentials(correo: string, token: string): void {
        localStorage.setItem('token', token);
    }

    isLoggedIn(): boolean {
        return this.getToken() !== '';
    }

    logOut() {
        localStorage.removeItem('token');
    }
}
