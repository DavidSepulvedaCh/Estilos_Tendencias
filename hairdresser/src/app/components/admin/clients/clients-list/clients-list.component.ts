import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
  providers: [UserService]
})
export class ClientsListComponent implements OnInit {

  public users: User[] = [];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(
      (data: any) => {
        if (data && data.users && Array.isArray(data.users)) {
          this.users = data.users;
          console.log(this.users);
        } else {
          console.error('La estructura de datos de la API no coincide con la esperada');
        }
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  updateUser(user: User): void {
  }

  blockUser(user: User): void {
  }

  deleteUser(user: User): void {
  }

}
