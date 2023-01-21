import {FilterOptionsTypes} from "./filterOptionsTypes";
import {FilterOptionType} from "./filterOptionsReducers";

export const addSearchText = (searchText: string) => {
    return {
        type: FilterOptionsTypes.ADD_SEARCH_TEXT,
        payload: searchText
    }
};

export const addFilterOptions = (filterOptions: FilterOptionType) => {
    return {
        type: FilterOptionsTypes.ADD_FILTER_OPTIONS,
        payload: filterOptions
    }
}

export const clearFilterOptions = () => {
    return {
        type: FilterOptionsTypes.CLEAR_FILTER_OPTIONS,
    }
}

