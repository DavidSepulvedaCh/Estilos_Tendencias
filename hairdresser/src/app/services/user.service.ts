import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class UserService {
    private apiURL = environment.apiUrl;

    public Users: Array<User>;

    constructor(private http: HttpClient) {
        this.Users = [];
    }

    getUsers(): Observable<User> {
        return this.http.get<User>(`${this.apiURL}/user/users`);
    }

}
