import {ItemsListTypes} from "./itemsListTypes";
import {ItemType} from "../../Item/Item";
import {CartProduct} from "../../CartForm/CartItem";
import {Product} from "./itemsListReducers";

export const loadProducts = (products: Product[]) => {
    return {
        type: ItemsListTypes.LOAD_PRODUCTS,
        payload: products
    }
}

export const addItemToCart = (product: ItemType, amount: number) => {
    return {
        type: ItemsListTypes.ADD_ITEM_TO_CART,
        payload: {product, amount}
    }
};

export const updateProductLimit = (cartProducts: CartProduct[]) => {
    return {
        type: ItemsListTypes.UPDATE_PRODUCT_LIMIT,
        payload: cartProducts
    }
}

export const removeItem = (product: ItemType) => {
    return {
        type: ItemsListTypes.REMOVE_ITEM_FROM_CART,
        payload: {product}
    }
}

export const removeAllItems = () => {
    return {
        type: ItemsListTypes.REMOVE_ALL_ITEMS_FROM_CART
    }
};

export const updateAmount = (product: ItemType, amount: number) => {
    return {
        type: ItemsListTypes.UPDATE_ITEM_IN_CART,
        payload: {product, amount}
    }
}

export const addItemToFavorites = (productId: string) => {
    return {
        type: ItemsListTypes.Add_ITEM_TO_FAVORITES,
        payload: productId
    }
}

export const removeItemFromFavorites = (productId: string) => {
    return {
        type: ItemsListTypes.REMOVE_ITEM_FROM_FAVORITES,
        payload: {productId}
    }
}