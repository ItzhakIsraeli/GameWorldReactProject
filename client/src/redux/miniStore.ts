import {ItemsState} from "./itemsList/itemsListReducers";
import {FilterOptionsState} from "./filterOptions/filterOptionsReducers";
import {UserDataState} from "./userData/userDataReducers";
import {AppSettingsState} from "./appSettings/appSettingsReducers";

export interface StoreState {
    items: ItemsState,
    filterOptions:FilterOptionsState,
    userData:UserDataState,
    appSettings:AppSettingsState
}

export const itemsMiniStore = (state: StoreState) => state.items;
export const filterOptionsMiniStore = (state: StoreState) => state.filterOptions;
export const useDataMiniStore = (state: StoreState) => state.userData;
export const appSettingsMiniStore = (state: StoreState) => state.appSettings;
