import {FilterOptionsTypes} from "./filterOptionsTypes";

export const addSearchText = (searchText:string) => {
    return {
        type: FilterOptionsTypes.ADD_SEARCH_TEXT,
        payload: searchText
    }
};