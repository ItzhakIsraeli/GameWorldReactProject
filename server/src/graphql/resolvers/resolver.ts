import * as DAL from "../../db/store.dal";
import * as Cart from "../cart";
import {ObjectId} from "mongoose";
import {Order, Product, User} from "../../db/store.schema";
import {pubsub} from "../index";
import {withFilter} from "graphql-subscriptions";

const getProducts = async (parent: any, args: { userId: string }, req: any) => {
    const products = await DAL.getAllProducts();
    return Cart.reduceProductsLimitByCart(args.userId, products);
};

const getProduct = async (parent: any, args: { id: ObjectId }) => {
    const result = await DAL.getProductDetails(args.id);
    if (!result) {
        throw new Error(`Product not Found : ${args.id}`)
    }
    return result;
};

const addProduct = (paren: any, args: { body: Product }) => DAL.addProduct(args.body);

const removeProduct = async (parent: any, args: { id: ObjectId }) => {
    const result = await DAL.removeProduct(args.id);
    if (!result) {
        throw new Error(`Product not Found : ${args.id}`)
    }
    return result;
};

const updateProduct = async (parent: any, args: { id: ObjectId, body: Partial<Product> }) => {
    const result = await DAL.updateProduct(args.id, args.body);
    if (!result) {
        throw new Error(`Product not Found : ${args.id}`)
    }
    return result;
};

const updateCart = async (parent: any, args: { userId: string, productId: string, amount: number }, req: any) => {
    const userId = args.userId;
    const delta = await Cart.updateCart(userId, args.productId, args.amount);
    await pubsub.publish("CART_UPDATE", {cartUpdate: {user: userId, cartProducts: [delta]}});
    return {_id: args.productId, amount: args.amount};
};

const checkout = async (parent: any, args: { userId: string, order: Order }, req: any) => {
    const userId = args.userId;
    await DAL.addOrder(args.order);
    const userCart = await DAL.checkout(args.order.products);
    const cartAfterUpdate = Cart.reduceProductsLimitByCart(userId, userCart);
    Cart.clearCart(userId);
    return cartAfterUpdate;
};

const getMyOrders = async (parent: any, args: { userId: string }) => {
    const result = await DAL.getMyOrders(args.userId);
    if (!result) {
        throw new Error(`Orders not Found BY User: ${args.userId}`)
    }
    return result;
};

const addOrder = (paren: any, args: { body: Order }) => DAL.addOrder(args.body);

const addUser = (paren: any, args: { body: User }) => DAL.addUser(args.body);

const updateUser = async (parent: any, args: { userId: string, body: Partial<User> }) => {
    const result = await DAL.updateUser(args.userId, args.body);
    if (!result) {
        throw new Error(`User not Found : ${args.userId}`)
    }
    return result;
}

const removeUser = async (parent: any, args: { userId: string }) => {
    const result = await DAL.removeUser(args.userId);
    if (!result) {
        throw new Error(`User not Found : ${args.userId}`)
    }
    return result;
}

const getUser = async (parent: any, args: { userId: string }) => {
    const result = await DAL.getUser(args.userId);
    if (!result) {
        throw new Error(`User ${args.userId} not Found !`)
    }
    return result;
};

const cartUpdate = {
    subscribe: withFilter(() => pubsub.asyncIterator(["CART_UPDATE"]),
        (payload, variables) => (payload.cartUpdate.user !== variables.userId)
    )
};

const id = ({_id}: { _id: string }) => _id

const getOrderTotalPriceByDate = async (parent: any, args: { email: string }) => {
    const result = await DAL.getOrderTotalPriceByDate(args.email);
    console.log(result);
    return result.map((item:any)=>({date: item._id.date, totalPrice: item.totalPrice }));
}

export const resolvers = {
    CartProduct: {
        id
    },
    Query: {
        getProducts,
        getProduct,
        getMyOrders,
        getUser,
        getOrderTotalPriceByDate
    },
    Mutation: {
        addProduct,
        removeProduct,
        updateProduct,
        updateCart,
        checkout,
        addOrder,
        addUser,
        removeUser,
        updateUser
    },
    Subscription: {
        cartUpdate
    }
}