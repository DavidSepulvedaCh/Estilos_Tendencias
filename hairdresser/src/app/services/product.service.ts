import { Injectable } from "@angular/core";
import { Product } from "../models/product";

@Injectable()
export class ProductService {
    public Products: Array<Product>;
    constructor() {
        this.Products = [
            new Product("KIT FIBRAS CAPILARES CAJA", "Con las fibras capilares FIBRE PLUS se obtiene un cabello denso y con volumen gracias a su exclusiva formula con Microfibras", "https://acortar.link/guEz6F", "MarcelFrance", 80500, "Keratina"),
            new Product("TRATAMIENTO REPARACIÓN INSTANTÁNEA", "Tratamiento concentrado especialmente diseñado para recuperar el cabello maltratado por procesos químicos.", "https://acortar.link/XmlX5t", "MarcelFrance", 100000, "Tratamientos"),
            new Product("CHAMPÚ DURAZNO 980ml", "Especialmente recomendado para la limpieza de cuero cabelludo y cabello normal.", "https://acortar.link/LWyy5I", "MarcelFrance", 80000, "Shampoo"),
            new Product("CHAMPÚ NUTRITIVO", "Champú nutritivo para cabellos secos y desnutridos. Fórmula profesional que aporta mayor suavidad, mayor elasticidad", "https://acortar.link/GSsvCH", "MarcelFrance", 46850, "Shampoo")
        ]
    }

    getProduct(): Array<Product> {
        return this.Products;
    }
}     