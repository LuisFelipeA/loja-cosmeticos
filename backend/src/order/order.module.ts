import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { OrderProductEntity } from './entities/orderProduct.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, UserEntity, ProductEntity, OrderProductEntity]),
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
