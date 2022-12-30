import {ItemsListTypes} from "./itemsListTypes";
import {ItemType} from "../../Item/Item";

export const addItemToCart = (itemData: ItemType) => {
    return {
        type: ItemsListTypes.ADD_ITEM_TO_CART,
        payload: itemData
    }
};

export const removeAllItems = () => {
    return {
        type: ItemsListTypes.REMOVE_ALL_ITEMS
    }
};