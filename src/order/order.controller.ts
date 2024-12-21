import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';

@Controller('order')
export class OrderController {

        constructor(private readonly orderService: OrderService) {}
    
        @Post()
        create(@Body() orderEntity: OrderEntity): Promise<OrderEntity> {
            return this.orderService.create(orderEntity);        
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
        async update(@Param('id') id:string, @Body() orderEntity: OrderEntity) {
            return this.orderService.update(id, orderEntity);
        }
    
        @Delete(':id')
        remove(@Param('id') id:string) {
            return this.orderService.remove(id);
        }
    
}
