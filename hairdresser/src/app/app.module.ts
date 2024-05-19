import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { WorksComponent } from './components/works/works.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [appRoutingProviders, AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
