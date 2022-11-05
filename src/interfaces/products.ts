export interface Product {
    name: string;
    price: number;
}

export interface AllProductsResponse {
    allProducts: [Product[], number];
}

export type CreateProductDtoResponse = Product | {
    isSuccessful: false;
    message: string;
}
