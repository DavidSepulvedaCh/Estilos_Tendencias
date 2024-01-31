import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { WorksComponent } from './components/works/works.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
<<<<<<< Updated upstream
=======
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductsListComponent } from './components/admin/products/products-list/products-list.component';
import { ClientsListComponent } from './components/admin/clients/clients-list/clients-list.component';
import { CreateProductComponent } from './components/admin/products/create-product/create-product.component';
import { environment } from 'src/environments/environment.prod';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    WorksComponent,
    ContactComponent,
    CreateComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    ReactiveFormsModule,
<<<<<<< Updated upstream
=======
    HttpClientModule,
    FormsModule,
>>>>>>> Stashed changes
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
