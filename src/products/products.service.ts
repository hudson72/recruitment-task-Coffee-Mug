import {HttpException, Injectable} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {CreateProductDtoResponse} from "../interfaces/products";
import {Products} from "./entities/products.entity";

@Injectable()
export class ProductsService {
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
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
