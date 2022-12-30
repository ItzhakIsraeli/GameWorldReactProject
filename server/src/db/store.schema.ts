import mongoose from 'mongoose';

const Schema = mongoose.Schema

export interface Product extends mongoose.Document{
    name: string,
    description: string,
    price: number,
    image: string,
    image2: string,
    market: string,
}

export interface Order extends mongoose.Document{
    firstName: string,
    lastName: string,
    phone: string,
    products: Array<string>,
}


const ProductModelSchema = new Schema<Product>({
    name: String,
    description: String,
    price: Number,
    image: String,
    image2: String,
    market: String,
});

const OrderModelSchema = new Schema<Order>({
    firstName: String,
    lastName: String,
    phone: String,
    products: [String],
});

export const ProductModel = mongoose.model<Product>("Product", ProductModelSchema);
export const OrderModel = mongoose.model<Order>("Order", OrderModelSchema);