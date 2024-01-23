import { Component, OnInit } from '@angular/core';
import { WorkService } from 'src/app/services/work.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  services: any[] = [];
  filteredServices: any[] = [];

  constructor(private workService: WorkService, private router: Router) { }

  ngOnInit(): void {
    this.workService.getWorks().subscribe(
      response => {
        this.services = response.Works;
        this.filteredServices = this.services;
      },
      error => {
        console.error('Error al obtener los services.', error);
      }
    );
  }

  filterServices(category: string) {
    if (category === 'woman' || category === 'man') {
      this.filteredServices = this.services.filter(service => service.category === category);
    } else {
      this.filteredServices = this.services;
    }
  }

}
