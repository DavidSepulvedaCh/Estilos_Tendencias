import { Component, OnInit } from '@angular/core';
import { WorkService } from 'src/app/services/work.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css'],
})
export class WorksComponent implements OnInit {
  services: any[] = [];
  filteredServices: any[] = [];
  public loading: boolean = true;
  filteredCategory: string = 'all';

  constructor(private workService: WorkService, private router: Router) { }

  ngOnInit(): void {
    this.workService.getServices().subscribe(
      (response) => {
        this.services = response.Works;
        this.filteredServices = this.services;
        console.log(this.services);
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los services.', error);
      }
    );
  }

  filterServices(category: string) {
    this.filteredCategory = category;
    if (category === 'Damas' || category === 'Caballeros') {
      this.filteredServices = this.services.filter(
        (service) => service.category === category
      );
    } else {
      this.filteredServices = this.services;
    }
  }
}
