import { Component } from '@angular/core';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent {
  services = [
    {
      name: 'Corte de Pelo Mujer',
      description: 'Corte de pelo moderno y personalizado para mujeres.',
      imageUrl: 'https://prestigesalonyspa.com/wp-content/uploads/2012/12/Cortes-Melena-2011-2.jpg',
      gender: 'mujer'
    },
    {
      name: 'Corte de Pelo Hombre',
      description: 'Corte de pelo moderno y personalizado para hombres.',
      imageUrl: 'https://media.revistagq.com/photos/5ef48c064786c513db97a443/16:9/w_3359,h_1889,c_limit/cortes-pelo-verano-gq5.jpg',
      gender: 'hombre'
    },
  ];

  filteredServices = this.services;

  filterServices(gender: string) {
    if (gender === 'mujer' || gender === 'hombre') {
      this.filteredServices = this.services.filter(service => service.gender === gender);
    } else {
      this.filteredServices = this.services;
    }
  }
}
