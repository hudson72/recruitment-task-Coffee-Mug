import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Product} from "../../interfaces/products";

@Entity()
export class Products extends BaseEntity implements Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 100,
    })
    name: string;

    @Column({
        nullable: false,
        type: "numeric",
        precision: 10,
        scale: 2,
    })
    price: number;

    @UpdateDateColumn({
        name: "update_date",
        default: () => "CURRENT_TIMESTAMP",
    })
    updateDate: Date;
}
