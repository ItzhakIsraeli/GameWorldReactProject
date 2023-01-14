import mongoose from 'mongoose';

const Schema = mongoose.Schema

export interface CartProduct extends mongoose.Document {
    amount: number
}

export interface Product extends mongoose.Document {
    name: string,
    description: string,
    price: number,
    image: string,
    market: string,
    limit: number
}

export interface User extends mongoose.Document {
    firstName: string,
    lastName: string,
    userId: string,
    phone: string,
    age: string,
    state: string,
    address: string,
    email: string,
}

export interface Order extends mongoose.Document {
    firstName: string,
    lastName: string,
    userId: string,
    date: string,
    phone: string,
    totalPrice: number,
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
    market: String,
    limit: Number
});

const OrderModelSchema = new Schema<Order>({
    firstName: String,
    lastName: String,
    userId: String,
    date: String,
    phone: String,
    totalPrice: Number,
    products: [CartProductSchema],
});

const UserModelSchema = new Schema<User>({
    firstName: String,
    lastName: String,
    userId: String,
    phone: String,
    age: String,
    state: String,
    address: String,
    email: String,
});

export const ProductModel = mongoose.model<Product>("Product", ProductModelSchema);
export const OrderModel = mongoose.model<Order>("Order", OrderModelSchema);
export const UserModel = mongoose.model<User>("User", UserModelSchema);