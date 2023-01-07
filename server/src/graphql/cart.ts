import {Product} from "../db/store.schema";
import {getProductDetails} from "../db/store.dal";

interface CartProduct {
    _id: string,
    amount: number
}

type UserId = string;
type ProductId = string;
type Cart = Record<UserId, Record<ProductId, number>>;

const cart: Cart = {};

export const reduceProductsLimitByCart = (userId: string, products: Product[]) => {
    let userCartAfterUpdateLimit = products;
    if (products) {
        Object.keys(cart).map((user) => {
            if (userId !== user) {
                Object.keys(cart[user]).map((productId) => {
                    userCartAfterUpdateLimit = products.map((product) => {
                        if (product.id === productId && product.limit) {
                            product.limit -= cart[user][productId];
                        }
                        return product;
                    })
                });
            }
        });
    }
    return userCartAfterUpdateLimit;
}


export const updateCart = async (userId: string, productId: string, amount: number): Promise<CartProduct> => {
    const productLimit = await getProductLimit(productId);
    if (productLimit && amount > productLimit) {
        throw new Error(`Product ${productId} out of stock! missing ${amount - productLimit}`);
    }
    const deltaAmount = getCartProductAmount(userId, productId) - amount;
    cart[userId][productId] = amount;
    return {_id: productId, amount: deltaAmount};
}

export const getCartListByUser = (userId: string): CartProduct[] =>
    Object.keys(cart[userId]).map((productId) => ({
        _id: productId,
        amount: cart[userId][productId]
    }))

export const releaseUserCart = (userId: string | undefined) => {
    if (userId) {
        let cartProducts: CartProduct[] = [];
        if (cart[userId] && Object.keys(cart[userId]).length > 0) {
            cartProducts = getCartListByUser(userId);
        }
        delete cart[userId];
        return {user: userId, cartProducts};
    }
}

const getProductLimit = async (productId: string) => {
    const product = await getProductDetails(productId);
    return product?.limit;
}

export const createUserCart = (id: string) => {
    if (!cart[id]) {
        cart[id] = {};
    }
}

export const clearCart = (id: string) => cart[id] = {};

const getCartProductAmount = (userId: string, productId: string): number =>
    cart[userId] && cart[userId][productId] ? cart[userId][productId] : 0
