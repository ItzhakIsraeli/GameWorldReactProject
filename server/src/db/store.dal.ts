import {CartProduct, Order, OrderModel, Product, ProductModel, User, UserModel} from "./store.schema";
import mongoose, {ObjectId} from "mongoose";

export const getAllProducts = async (): Promise<Product[]> => ProductModel.find();

export const getProductDetails = async (_id: ObjectId | string): Promise<Product | null> =>
    ProductModel.findOne({_id});

export const addProduct = async (product: Product): Promise<Product> => ProductModel.create(product);

export const removeProduct = async (_id: ObjectId): Promise<Product | null> =>
    ProductModel.findOneAndRemove({_id}, {new: true});

export const updateProduct = async (_id: ObjectId, field: Partial<Product>, session?: mongoose.ClientSession): Promise<Product | null> =>
    ProductModel.findOneAndUpdate({_id}, field, {new: true, session});

export const addOrder = async (order: Order): Promise<Order> => OrderModel.create(order);

export const getMyOrders = async (userId: string): Promise<Order[]> => OrderModel.find({userId});

export const checkout = async (checkoutProducts: CartProduct[]): Promise<Product[]> => {
    const session = await mongoose.startSession();
    let products: Product[] = [];
    try {
        await session.withTransaction(async () => {
            products = await Promise.all(
                checkoutProducts.map(async (cartProduct) => {
                    let product: Product = await ProductModel.findOne({
                        _id: cartProduct._id
                    }).session(session) as Product;
                    if (!product) {
                        throw new Error('Product Not Found');
                    }
                    if (product.limit) {
                        if (product.limit < cartProduct.amount) {
                            throw new Error(`Product ${cartProduct._id} out of stock! missing ${cartProduct.amount - product.limit}`);
                        }
                    }
                    const newProduct = await updateProduct(
                        cartProduct._id,
                        {limit: product.limit - cartProduct.amount},
                        session
                    );
                    product = newProduct ? newProduct : product;
                    return product
                })
            );
            return products;
        })
    } catch (err) {
        throw err
    } finally {
        await session.endSession();
    }
    return products;
};

export const addUser = async (user: User): Promise<User> => UserModel.create(user);

export const removeUser = async (userId: string): Promise<User | null> =>
    UserModel.findOneAndRemove({userId}, {new: true});

export const updateUser = async (userId: string, field: Partial<User>): Promise<User | null> =>
    UserModel.findOneAndUpdate({userId}, field, {new: true});

export const getUser = async (userId: string): Promise<User | null> => UserModel.findOne({userId});