import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { WorkService } from 'src/app/services/work.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css'],
  providers: [WorkService],
})
export class ListServicesComponent implements OnInit {
  public services: Service[] = [];
  selectedImage: File | null = null;
  changed: boolean = false;
  confirmDelete: boolean = false;

  selectedService: Service = {
    id: '',
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  };

  isUpdateModalVisible = false;

  constructor(private __workService: WorkService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.__workService.getServices().subscribe(
      (data: any) => {
        if (data && data.Works && Array.isArray(data.Works)) {
          this.services = data.Works;
          console.log(this.services);
        } else {
          console.error(
            'La estructura de datos de la API no coincide con la esperada'
          );
        }
      },
      (error: any) => {
        console.error('Error al obtener los Servicios:', error);
      }
    );
  }

  updateService(service: any) {
    this.selectedService = { ...service };
    this.isUpdateModalVisible = true;
  }

  closeUpdateModal() {
    this.isUpdateModalVisible = false;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedImage = file;
    this.changed = true;
  }

  showDeleteConfirmation(service: Service) {
    this.selectedService = service;
    this.confirmDelete = true;
  }

  deleteService(service: Service) {
    console.log(service);
    this.__workService.deleteService(service.id).subscribe(
      (response: any) => {
        if (response && response.message) {
          this._snackBar.open('¡Servicio eliminado correctamente!', 'Cerrar', {
            duration: 5000,
          });
          this.services = this.services.filter(p => p.id !== this.selectedService.id);
          this.confirmDelete = false;
        } else {
          console.error(
            'La estructura de datos de la API no coincide con la esperada'
          );
        }
      },
      (error) => {
        window.alert('Error al eliminar el Servicio');
        console.error('Error al eliminar el Servicio:', error);
      }
    );
  }

  updateServiceInList(updatedService: any) {
    const formData = new FormData();
    formData.append('name', updatedService.name);
    formData.append('description', updatedService.description);
    formData.append('category', updatedService.category);
    formData.append('id', updatedService.id);
    if (this.changed == true) {
      formData.append('image', this.selectedImage!);
    }

    this.__workService.updateService(updatedService.id, formData).subscribe(
      (response: any) => {
        if (response && response.service) {
          console.log(response);
          this._snackBar.open('Servicio actualizado correctamente!', 'Cerrar', {
            duration: 5000,
          });
          this.services = this.services.map(p =>
            p.id === updatedService.id ? { ...response.product } : p
          );
          this.closeUpdateModal();
        } else {
          console.error(
            'La estructura de datos de la API no coincide con la esperada'
          );
        }
      },
      (error: any) => {
        window.alert('Error al actualizar el Servicio');
        console.error('Error al actualizar el Servicio:', error);
      }
    );
  }
}
