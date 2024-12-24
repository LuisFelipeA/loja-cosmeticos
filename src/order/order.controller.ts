import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dtos/createOrder.dto';

@Controller('order')
export class OrderController {

        constructor(private readonly orderService: OrderService) {}
    
        @Post()
        create(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {

            const orderEntity = new OrderEntity();
            orderEntity.userId = createOrderDto.userId;
            orderEntity.status = createOrderDto.status;
            orderEntity.shippingAddress = createOrderDto.shippingAddress;
            orderEntity.totalAmount = 0; // inicia com zero e calcula depois

            return this.orderService.create(orderEntity, createOrderDto.products);        
        }
    
        @Get()
        async findAll(): Promise<OrderEntity[]> {
            return await this.orderService.findAll();
        }
    
        @Get(':id')
        async findOne(@Param('id') id: string): Promise<OrderEntity> {
            return await this.orderService.findById(id);
        }

        @Put(':id')
        async update(@Param('id') id:string, @Body() createOrderDto: CreateOrderDto) {
            
            const orderEntity = new OrderEntity();
            orderEntity.userId = createOrderDto.userId;
            orderEntity.status = createOrderDto.status;
            orderEntity.shippingAddress = createOrderDto.shippingAddress;
            orderEntity.totalAmount = 0;

            return this.orderService.update(id, orderEntity, createOrderDto.products);
        }
    
        @Delete(':id')
        remove(@Param('id') id:string) {
            return this.orderService.remove(id);
        }
    
}
