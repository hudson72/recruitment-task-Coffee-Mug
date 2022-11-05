import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {IsDecimal} from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {
    name: string;

    @IsDecimal()
    price: number;
}
