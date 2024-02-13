import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'cartshopping',
  templateUrl: './cartshopping.component.html',
  styleUrls: ['./cartshopping.component.css']
})
export class CartshoppingComponent implements OnInit {

  products: Product[] = [
    {
      id: '1',
      name: "Producto 1",
      description: "Descripción del producto 1",
      price: 100,
      image: "https://img.freepik.com/foto-gratis/autos-deportivos-modernos-aceleran-traves-ia-generativa-curvas-oscuras_188544-9136.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1707696000&semt=ais",
      brand: "Marca 1",
      category: "Categoría 1",
      stock: 10
    },
    {
      id: '2',
      name: "Producto 2",
      description: "Descripción del producto 2",
      price: 200,
      image: "https://media.gq.com.mx/photos/5d6ec5c43d0c810008e7008c/4:3/w_2248,h_1686,c_limit/bugatti.jpg",
      brand: "Marca 2",
      category: "Categoría 2",
      stock: 20
    },
    {
      id: '3',
      name: "Producto 3",
      description: "Descripción del producto 3",
      price: 300,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGJr1nPKK_z3VeUomMP-l4iBiqKAgHN57vvA7Z1lCxniKLNmwWiENH85gVymqi4aUnDPY&usqp=CAU",
      brand: "Marca 3",
      category: "Categoría 3",
      stock: 30
    }
  ];

  total: number = 0;

  ngOnInit() {
    this.calculateTotal();
  }

  onComprar() {
    alert("¡Gracias por tu compra!");
  }

  calculateTotal() {
    this.total = this.products.reduce((sum, product) => sum + product.price, 0);
  }

}
