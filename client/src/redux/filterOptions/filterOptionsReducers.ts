import {FilterOptionsTypes} from "./filterOptionsTypes";

export interface FilterOptionsState {
    searchText: string
}

interface actionI {
    type: string,
    payload: {
        data: string
    }
}

const initialState: FilterOptionsState = {
    searchText: ''
};

const filterOptionsReducer = (state: FilterOptionsState = initialState, action: actionI) => {
    switch (action.type) {
        case FilterOptionsTypes.ADD_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload
            };

        default:
            return state
    }
}

export default filterOptionsReducer;