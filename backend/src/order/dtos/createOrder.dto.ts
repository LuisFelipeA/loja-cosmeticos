import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsInt()
    userId: number;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsOptional()
    @IsString()
    shippingAddress?: string;

    @IsArray()
    @IsNotEmpty()
    products: {
        productId: number;
        quantity: number;
    }[];
}
