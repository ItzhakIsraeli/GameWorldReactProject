import {ItemsListTypes} from "./itemsListTypes";
import {ItemType} from "../../Item/Item";

export const addItemToCart = (product: ItemType, amount: number) => {
    return {
        type: ItemsListTypes.ADD_ITEM_TO_CART,
        payload: {product, amount}
    }
};

export const removeItem = (product: ItemType) => {
    return {
        type: ItemsListTypes.REMOVE_ITEM,
        payload: {product}
    }
}

export const removeAllItems = () => {
    return {
        type: ItemsListTypes.REMOVE_ALL_ITEMS
    }
};

export const updateAmount = (product: ItemType, amount: number)=>{
    return {
        type: ItemsListTypes.UPDATE_ITEM_IN_CART,
        payload: {product, amount}
    }
}