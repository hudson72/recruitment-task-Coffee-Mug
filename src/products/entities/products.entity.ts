import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Products extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
        length: 100,
    })
    name: string;

    @Column({
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
