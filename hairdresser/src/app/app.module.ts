import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing, appRoutingProviders } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { WorksComponent } from './components/admin/hairdresser_services/works/works.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/auth/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductsListComponent } from './components/admin/products/products-list/products-list.component';
import { ClientsListComponent } from './components/admin/clients/clients-list/clients-list.component';
import { CreateProductComponent } from './components/admin/products/create-product/create-product.component';
import { PasswordRecoveryComponent } from './components/auth/password-recovery/password-recovery.component';
import { ProductCardComponent } from './components/shopping/product-card/product-card.component';
import { CartshoppingComponent } from './components/shopping/cartshopping/cartshopping.component';
import { ListServicesComponent } from './components/admin/hairdresser_services/list-services/list-services.component';
import { CreateServiceComponent } from './components/admin/hairdresser_services/create-service/create-service.component';
import { EmailVerificationSuccessComponent } from './components/email-verification-success/email-verification-success.component';
import { CreateSuppliersComponent } from './components/admin/suppliers/create-suppliers/create-suppliers.component';
import { SuppliersListComponent } from './components/admin/suppliers/suppliers-list/suppliers-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    WorksComponent,
    ContactComponent,
    CreateComponent,
    DashboardComponent,
    RegisterComponent,
    ProductsListComponent,
    ClientsListComponent,
    CreateProductComponent,
    PasswordRecoveryComponent,
    ProductCardComponent,
    CartshoppingComponent,
    ListServicesComponent,
    CreateServiceComponent,
    EmailVerificationSuccessComponent,
    CreateSuppliersComponent,
    SuppliersListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [appRoutingProviders, AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
