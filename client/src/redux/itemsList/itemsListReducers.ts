import {ItemsListTypes} from "./itemsListTypes";
import {ItemType} from "../../Item/Item";
import {CartItemType} from "../../CartForm/CartItem";

export interface ItemsState {
    ItemsList: []
}

interface actionI {
    type: string,
    payload: {
        product: ItemType,
        amount: number
    }
}

const initialState: ItemsState = {
    ItemsList: []
};

const itemsListReducer = (state: ItemsState = initialState, action: actionI) => {
    switch (action.type) {
        case ItemsListTypes.ADD_ITEM_TO_CART:
            return {
                ...state,
                ItemsList: [...state.ItemsList, {product: action.payload.product, amount: action.payload.amount}]
            };
        case ItemsListTypes.UPDATE_ITEM_IN_CART:
            return {
                ...state,
                ItemsList: state.ItemsList.map((item: CartItemType) => {
                    if (item.product.id === action.payload.product.id) {
                        item.amount = action.payload.amount
                    }
                    console.log(item)
                    return item;
                })
            };
        case ItemsListTypes.REMOVE_ITEM:
            return {
                ...state,
                ItemsList: state.ItemsList.filter((item: CartItemType) => {
                    console.log(item.product.id)
                        return item.product.id !== action.payload.product.id
                    }
                )
            };
        case ItemsListTypes.REMOVE_ALL_ITEMS:
            return {
                ...state,
                ItemsList: []
            }
        default:
            return state
    }
};

export default itemsListReducer;