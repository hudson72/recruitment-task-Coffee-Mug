import {HttpException, Inject, Injectable} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  AllProductsResponse,
  CreateProductDtoResponse,
  Product,
  RemoveProductResponse,
  UpdateProductDtoResponse
} from "../interfaces/products";
import {Products} from "./entities/products.entity";
import {DataSource} from "typeorm";

@Injectable()
export class ProductsService {

  constructor(
      @Inject(DataSource) private dataSource: DataSource) {}

  async create(createProductDto: CreateProductDto): Promise<CreateProductDtoResponse> {
    const product = await new Products();
    const {name, price} = createProductDto;
    product.name = name;
    product.price = price;

    if (await Products.findOne({where: {name: createProductDto.name}})) {
      throw new HttpException(`Product name: '${name}' already exists! Please provide a new product name.`, 400)
    }

    await product.save();
    return product;
  };

  async findAll(): Promise<AllProductsResponse> {
    const allProducts = await this.dataSource
        .createQueryBuilder()
        .select('products')
        .from(Products, 'products')
        .getManyAndCount()

    return {
      allProducts,
    };
  };

  async findOne(id: string): Promise<Product> {
    if (!await Products.findOne({where: {id}})) {
      throw new HttpException(`Product with ID: '${id}' doesn't exist!`, 404);
    }

    return await Products.findOne({where: {id}})
  };

  async update(id: string, updateProductDto: UpdateProductDto): Promise<UpdateProductDtoResponse> {
    const productToUpdate = await Products.findOne({where: {id}});
    if (!productToUpdate) throw new HttpException(`Sorry, product with ID: '${id}' doesn't exist!`, 404);

    if (!updateProductDto.name && !updateProductDto.price) throw new HttpException(`Sorry, no data provided for update! Please provide a new 'name' or a new 'price'`, 400);

    if (updateProductDto.name === productToUpdate.name)  throw new HttpException(`Sorry, the given name and the existing one are the same: '${productToUpdate.name}'! Please provide a new 'name'`, 400);

    if (updateProductDto.price == productToUpdate.price)  throw new HttpException(`Sorry, the given price and the existing one are the same: '${productToUpdate.price}'! Please provide a new 'price'`, 400);

    await Products.update(id, updateProductDto);
    return {
      isSuccessful: true,
      message: `Product with ID: '${id}' has been updated`,
    };
  };

  async remove(id: string): Promise<RemoveProductResponse> {
    if (!await Products.findOne({where: {id}})) {
      throw new HttpException(`Product with ID: '${id}' doesn't exist!`, 404);
    }

    await Products.delete(id);
    return {
      isSuccessful: true,
      message: `Product with ID: '${id}' has been deleted.`,
    }
  }
}
