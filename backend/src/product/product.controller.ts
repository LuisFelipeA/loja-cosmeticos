import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    create(@Body() productEntity: ProductEntity): Promise<ProductEntity> {
        return this.productService.create(productEntity);        
    }

    @Get()
    async findAll(): Promise<ProductEntity[]> {
        return await this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ProductEntity> {
        return await this.productService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() productEntity: ProductEntity) {
        return this.productService.update(id, productEntity);
    }

    @Delete(':id')
    remove(@Param('id') id:string) {
        return this.productService.remove(id);
    }

}
