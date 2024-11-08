import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupplierService } from 'src/app/services/supplier.service';

interface Supplier {
  id: string;
  name: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css'],
  providers: [SupplierService],
})
export class SuppliersListComponent implements OnInit {
  public suppliers: Supplier[] = [];
  confirmDelete: boolean = false;
  selectedSupplier: Supplier | null = null;

  constructor(private _supplierService: SupplierService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this._supplierService.getSuppliers().subscribe(
      (data: any) => {
        if (data && data.Suppliers && Array.isArray(data.Suppliers)) {
          this.suppliers = data.Suppliers;
        } else {
          console.error('La estructura de datos de la API no coincide con la esperada');
        }
      },
      (error) => {
        console.error('Error al obtener los proveedores:', error);
      }
    );
  }

  showDeleteConfirmation(supplier: Supplier) {
    this.selectedSupplier = supplier;
    this.confirmDelete = true;
  }

  deleteSupplier() {
    if (!this.selectedSupplier) {
      this._snackBar.open('No se ha seleccionado un proveedor', 'Cerrar', {
        duration: 2000,
      });
    }

    this._supplierService.deleteSupplier(this.selectedSupplier!.id).subscribe(
      (response: any) => {
        if (response && response.message) {
          this._snackBar.open(response.message, 'Cerrar', {
            duration: 2000,
          });
          this.suppliers = this.suppliers.filter(supplier => supplier.id !== this.selectedSupplier!.id);
          this.confirmDelete = false;
        } else {
          this._snackBar.open('Error al eliminar el proveedor', 'Cerrar', {
            duration: 2000,
          });
        }
      },
      (error) => {
        this._snackBar.open('Error al eliminar el proveedor', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

}
