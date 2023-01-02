import mongoose from 'mongoose';

const Schema = mongoose.Schema

export interface CartProduct extends mongoose.Document{
    amount: number
}

export interface Product extends mongoose.Document{
    name: string,
    description: string,
    price: number,
    image: string,
    image2: string,
    market: string,
    limit: number
}

export interface Order extends mongoose.Document{
    firstName: string,
    lastName: string,
    phone: string,
    products: Array<CartProduct>,
}
const CartProductSchema = new Schema<CartProduct>({
    amount: Number
});

const ProductModelSchema = new Schema<Product>({
    name: String,
    description: String,
    price: Number,
    image: String,
    image2: String,
    market: String,
    limit: Number
});

const OrderModelSchema = new Schema<Order>({
    firstName: String,
    lastName: String,
    phone: String,
    products: [CartProductSchema],
});

export const ProductModel = mongoose.model<Product>("Product", ProductModelSchema);
export const OrderModel = mongoose.model<Order>("Order", OrderModelSchema);