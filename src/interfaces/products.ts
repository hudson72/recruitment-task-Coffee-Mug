export class Product {
    name: string;
    price: number;
}

export interface AllProducts {
    allProducts: Product[];
    total: number;
}

export type CreateProductDtoResponse = Product | {
    isSuccessful: false;
    message: string;
}
