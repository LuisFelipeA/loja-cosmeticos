import { OrderProductEntity } from "src/order/entities/orderProduct.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'product'})
export class ProductEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'description', nullable: false})
    description: string;

    @Column({name: 'price', nullable: false})
    price: number;

    @Column({name: 'stock_quantity', nullable: false})
    stockQuantity: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
    orderProducts?: OrderProductEntity[]
}
