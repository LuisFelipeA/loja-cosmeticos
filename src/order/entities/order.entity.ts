import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'order'})
export class OrderEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: "user_id", nullable: false})
    userId: number;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    @JoinColumn({ name: 'user_id' }) 
    user?: UserEntity

    @Column({name: 'order_date', nullable: false})
    orderDate: Date;

    @Column({name: 'status', nullable: false})
    status: string;

    @Column({name: 'total_amount', nullable: false})
    totalAmount: number;

    @Column({name: 'shipping_address', nullable: false})
    shippingAddress: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
