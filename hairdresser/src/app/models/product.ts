export class Product {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public image: string,
        public brand: string,
        public price: number,
        public category: string,
        public stock: number
    ) { }
}