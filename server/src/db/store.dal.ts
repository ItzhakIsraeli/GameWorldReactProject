import {Order, OrderModel, Product, ProductModel} from "./store.schema";

export const getAllProducts = async (): Promise<Product[]> => ProductModel.find();

export const checkout = async (body: Order): Promise<Order> => OrderModel.create(body);