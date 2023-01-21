import {FilterOptionsTypes} from "./filterOptionsTypes";

export interface FilterOptionsState {
    searchText: string,
    filterOptions: FilterOptionType
}

export interface FilterOptionType {
    minUserRate: string,
    minMetaScore: string,
    minPrice: string,
    maxPrice: string,
    platform: string
}

interface actionI {
    type: string,
    payload: {
        data: string
    }
}

const initialState: FilterOptionsState = {
    searchText: '',
    filterOptions: {
        minUserRate: '',
        minMetaScore: '',
        minPrice: '',
        maxPrice: '',
        platform: ''
    }
};

const filterOptionsReducer = (state: FilterOptionsState = initialState, action: actionI) => {
    switch (action.type) {
        case FilterOptionsTypes.ADD_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload
            };

        case FilterOptionsTypes.ADD_FILTER_OPTIONS:
            return {
                ...state,
                filterOptions: action.payload
            }
        case FilterOptionsTypes.CLEAR_FILTER_OPTIONS:
            return {
                ...state,
                filterOptions: initialState.filterOptions
            }
        default:
            return state
    }
}

export default filterOptionsReducer;