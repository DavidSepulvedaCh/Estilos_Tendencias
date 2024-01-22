import { Component } from '@angular/core';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent {

  /* Este JSON es provisional mientras que se integra en el back */

  services = [
    {
      name: 'Corte de Cabello Mujer',
      description: 'Corte de pelo moderno y personalizado para damas.',
      imageUrl: 'https://images.unsplash.com/photo-1613966582880-80a7327b250f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gender: 'mujer'
    },
    {
      name: 'Cepillado de Cabello Mujer',
      description: 'Cepillado de cabello para damas.',
      imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gender: 'mujer'
    },
    {
      name: 'Corte de cabello Hombre',
      description: 'Corte de pelo moderno y personalizado para caballeros.',
      imageUrl: 'https://images.unsplash.com/photo-1590540179937-484393bfd879?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      gender: 'hombre'
    },
    {
      name: 'Perfilación de barba',
      description: 'Corte de barba para caballeros.',
      imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
