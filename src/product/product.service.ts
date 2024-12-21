import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ){ }
    
    async create(productEntity: ProductEntity): Promise<ProductEntity> {
        return this.productRepository.save({...productEntity})
    }
    
    async findAll(): Promise<ProductEntity[]> {

        const productList = await this.productRepository.find(); 
        
        if (!productList || productList.length === 0) {
            throw new HttpException('Users not found', HttpStatus.NOT_FOUND); 
        }

        return productList;
    }
    
    async findById(idProduct: string): Promise<ProductEntity> {
        const product = await this.productRepository.findOneBy({id: Number(idProduct)});
        
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND); 
        }

        return product;
    }

    async update(idProduct: string, productEntity: ProductEntity): Promise<ProductEntity> {
        const product = await this.findById(idProduct);
        
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND); 
        }
        
        Object.assign(product, productEntity); 

        return this.productRepository.save(product); 
    }
    
    async remove(idProduct: string): Promise<string> {
        const product = await this.findById(idProduct); 

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND); 
        }

        await this.productRepository.remove(product); 

        return 'Product deleted'
    }

}
