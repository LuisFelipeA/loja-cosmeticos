import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "src/product/entities/product.entity";

@Entity({name: 'order_product'})
export class OrderProductEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: "order_id", nullable: false})
    orderId: number;

    @Column({name: "product_id", nullable: false})
    productId: number;

    @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
    @JoinColumn({ name: 'order_id' }) 
    order?: OrderEntity

    @ManyToOne(() => ProductEntity, (product) => product.orderProducts)
    @JoinColumn({ name: 'product_id' }) 
    product?: ProductEntity

    @Column({name: 'quantity', nullable: false})
    quantity: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

}


