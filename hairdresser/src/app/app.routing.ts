import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { WorksComponent } from "./components/works/works.component";
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/create/create.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegisterComponent } from "./components/register/register.component";

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "products", component: ProductsComponent },
    { path: "services", component: WorksComponent },
    { path: "contact", component: ContactComponent },
    { path: "login", component: CreateComponent },
    { path: "admin-panel", component: DashboardComponent },
    { path: "register", component: RegisterComponent },
    { path: "**", component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);