import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { WorksComponent } from './components/admin/hairdresser_services/works/works.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/auth/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/authGuard.service';
import { ProductsListComponent } from './components/admin/products/products-list/products-list.component';
import { ClientsListComponent } from './components/admin/clients/clients-list/clients-list.component';
import { CreateProductComponent } from './components/admin/products/create-product/create-product.component';
import { PasswordRecoveryComponent } from './components/auth/password-recovery/password-recovery.component';
import { CartshoppingComponent } from './components/shopping/cartshopping/cartshopping.component';
import { ListServicesComponent } from './components/admin/hairdresser_services/list-services/list-services.component';
import { CreateServiceComponent } from './components/admin/hairdresser_services/create-service/create-service.component';
import { EmailVerificationSuccessComponent } from './components/email-verification-success/email-verification-success.component';
import { CreateSuppliersComponent } from './components/admin/suppliers/create-suppliers/create-suppliers.component';
import { SuppliersListComponent } from './components/admin/suppliers/suppliers-list/suppliers-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'services', component: WorksComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: CreateComponent },
  { path: 'admin-panel', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-panel/products-list', component: ProductsListComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel/users-list', component: ClientsListComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel/create-product', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'email-success', component: EmailVerificationSuccessComponent },
  { path: 'carshopping', component: CartshoppingComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel/list-services', component: ListServicesComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel/create-service', component: CreateServiceComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel/create-supplier', component: CreateSuppliersComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel/suppliers-list', component: SuppliersListComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forRoot(appRoutes);
