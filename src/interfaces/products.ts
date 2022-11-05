export interface Product {
    name: string;
    price: number;
}

export interface AllProductsResponse {
    allProducts: [Product[], number];
}

export type CreateProductDtoResponse = Product;

export interface UpdateProductDtoResponse {
    isSuccessful: boolean;
    message: string;
}

export interface RemoveProductResponse {
    isSuccessful: boolean;
    message: string;
}