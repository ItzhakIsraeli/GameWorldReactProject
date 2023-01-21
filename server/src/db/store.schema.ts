import mongoose from 'mongoose';

const Schema = mongoose.Schema

export interface CartProduct extends mongoose.Document {
    amount: number
}

export interface Product extends mongoose.Document {
    name: string,
    rate: number,
    userRate: string,
    platform: string,
    releaseDate: string,
    description: string,
    price: number,
    image: string,
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
    email: string,
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
    rate: Number,
    userRate: String,
    platform: String,
    releaseDate: String,
    description: String,
    price: Number,
    image: String,
    limit: Number
});

const OrderModelSchema = new Schema<Order>({
    firstName: String,
    lastName: String,
    email: String,
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