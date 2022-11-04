export class Product {
    name: string;
    price: number;
}

export interface AllProducts {
    allProducts: Product[];
    total: number;
}