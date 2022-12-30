import {ItemsListTypes} from "./itemsListTypes";
import {ItemType} from "../../Item/Item";

export interface ItemsState {
    ItemsList: []
}

interface actionI {
    type: string,
    payload: {
        data: ItemType
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
                ItemsList: [...state.ItemsList, action.payload]
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