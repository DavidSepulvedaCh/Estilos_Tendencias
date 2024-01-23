import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { WorksComponent } from "./components/works/works.component";
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/auth/create/create.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { AuthGuard } from "./services/authGuard.service";


const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "products", component: ProductsComponent },
    { path: "services", component: WorksComponent },
    { path: "contact", component: ContactComponent },
    { path: "login", component: CreateComponent },
    { path: "admin-panel", component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "register", component: RegisterComponent },
    { path: "**", component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);