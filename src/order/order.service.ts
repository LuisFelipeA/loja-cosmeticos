import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){ }

    
    
    async create(orderEntity: OrderEntity): Promise<OrderEntity> {

        // busca usuario para guardar no order
        const user = await this.userRepository.findOneBy({ id: orderEntity.userId });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        orderEntity.user = user;

        orderEntity.shippingAddress = user.address;

        orderEntity.totalAmount = 0; // implementar logica de totalAmount

        return this.orderRepository.save({...orderEntity})

    }

    async findAll(): Promise<OrderEntity[]> {

        const orderList = await this.orderRepository.find(); 
        
        if (!orderList || orderList.length === 0) {
            throw new HttpException('Orders not found', HttpStatus.NOT_FOUND); 
        }

        console.log(orderList)

        return orderList;

    }
    
    async findById(idOrder: string): Promise<OrderEntity> {
        const order = await this.orderRepository.findOneBy({id: Number(idOrder)});
        
        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND); 
        }

        return order;
    }

    async update(idOrder: string, orderEntity: OrderEntity): Promise<OrderEntity> {
        const order = await this.findById(idOrder);
        
        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND); 
        }
        
        const user = await this.userRepository.findOneBy({ id: orderEntity.userId });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        orderEntity.user = user;

        orderEntity.shippingAddress = user.address;

        orderEntity.totalAmount = 0; // implementar logica de totalAmount

        Object.assign(order, orderEntity); 

        return this.orderRepository.save(order); 
    }
    
    async remove(idOrder: string): Promise<string> {
        const order = await this.findById(idOrder); 

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND); 
        }

        await this.orderRepository.remove(order); 

        return 'Order deleted'
    }

}
