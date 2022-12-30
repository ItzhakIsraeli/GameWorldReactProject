import {ItemsState} from "./itemsList/itemsListReducers";

export interface StoreState {
    items: ItemsState
}

export const itemsMiniStore = (state: StoreState) => state.items;
