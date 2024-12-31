import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderProductEntity } from './entities/orderProduct.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        @InjectRepository(OrderProductEntity)
        private readonly orderProductRepository: Repository<OrderProductEntity>
    ){ }

    async create(orderEntity: OrderEntity, productData: { productId: number; quantity: number;}[]): Promise<OrderEntity> {
        console.log("create")
        console.log(productData)
        // Busca usuário para guardar no order
        const user = await this.userRepository.findOneBy({ id: orderEntity.userId });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }    

        // Verifica se foi passado o produto no pedido
        if (!productData || productData.length === 0) {
            throw new HttpException(`Product data is empty`, HttpStatus.BAD_REQUEST);
        }

        orderEntity.user = user;

        // Caso não passe o enderço, usar endereço do usuario
        if (!orderEntity.shippingAddress){            
            orderEntity.shippingAddress = user.address;
        }
    
        // Percorre lista de produtos e calcula valor do pedido
        let totalAmount = 0;
        const orderProducts = [];
    
        for (const product of productData) {
            const productEntity = await this.productRepository.findOneBy({ id: product.productId });
    
            if (!productEntity) {
                throw new HttpException(`Product with ID ${product.productId} not found`, HttpStatus.NOT_FOUND);
            }            

            totalAmount += productEntity.price * product.quantity;

            orderProducts.push({
                productId: product.productId,
                quantity: product.quantity                
            });
        }
    
        // salva o pedido no banco
        const savedOrder = await this.orderRepository.save({
            ...orderEntity,
            totalAmount
        });

        // Salvar na tabela order_product
        for (const orderProduct of orderProducts) {
            await this.orderProductRepository.save({
                orderId: savedOrder.id,
                productId: orderProduct.productId,
                quantity: orderProduct.quantity
            });
        }

        return savedOrder;
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

        const order = await this.orderRepository.findOne({
            where: { id: Number(idOrder) },
            relations: ['orderProducts', 'orderProducts.product'] // Relaciona tabela order com order_product
        });     

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND); 
        }

        return order;
    }

    async update(idOrder: string, orderEntity: OrderEntity, productData: { productId: number; quantity: number }[]): Promise<OrderEntity> {
        const order = await this.findById(idOrder); // Busca pedido
    
        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        const user = await this.userRepository.findOneBy({ id: orderEntity.userId });
    
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
            
        if (!orderEntity.shippingAddress){            
            orderEntity.shippingAddress = user.address;
        }


        let totalAmount = 0;
        const orderProducts = [];

        // Verifica se foi passado o produto no pedido
        if (!productData || productData.length === 0) {
            throw new HttpException(`Product data is empty`, HttpStatus.BAD_REQUEST);
        }

        // calcula valor e guarda produtos do pedido
        for (const product of productData) {

            const productEntity = await this.productRepository.findOneBy({ id: product.productId });
    
            if (!productEntity) {
                throw new HttpException(`Product with ID ${product.productId} not found`, HttpStatus.NOT_FOUND);
            }
    
            totalAmount += productEntity.price * product.quantity;
    
            orderProducts.push({
                productId: product.productId,
                quantity: product.quantity,
            });
        }
    
        orderEntity.totalAmount = totalAmount;

        Object.assign(order, orderEntity);
    
        const updatedOrder = await this.orderRepository.save(order);
    
        await this.orderProductRepository.delete({ orderId: updatedOrder.id }); // remove relacionamentos antigos
    
        // relaciona novamente
        for (const orderProduct of orderProducts) {
            await this.orderProductRepository.save({
                orderId: updatedOrder.id,
                ...orderProduct,
            });
        }

        return this.findById(idOrder);
    }
    
    async remove(idOrder: string): Promise<string> {
        const order = await this.findById(idOrder); 

        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND); 
        }

        await this.orderRepository.remove(order); 
        await this.orderProductRepository.delete({ orderId: Number(idOrder)});

        return 'Order deleted'
    }

}
