import {ItemsState} from "./itemsList/itemsListReducers";
import {FilterOptionsState} from "./filterOptions/filterOptionsReducers";

export interface StoreState {
    items: ItemsState,
    filterOptions:FilterOptionsState
}

export const itemsMiniStore = (state: StoreState) => state.items;
export const filterOptionsMiniStore = (state: StoreState) => state.filterOptions;
