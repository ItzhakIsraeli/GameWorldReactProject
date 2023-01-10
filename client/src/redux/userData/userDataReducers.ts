import {UserDataTypes} from "./userDataTypes";

export interface UserDataType {
    firstName: string
}

export interface UserDataState {
    userData: UserDataType
}

interface actionI {
    type: string,
    payload: {
        data: UserDataType
    }
}

const initialState: UserDataState = {
    userData:
        {
            firstName: ''
        }
};

const filterOptionsReducer = (state: UserDataState = initialState, action: actionI) => {
    switch (action.type) {
        case UserDataTypes.ADD_USER_DATA:
            return {
                ...state,
                userData: action.payload.data
            };

        default:
            return state
    }
}

export default filterOptionsReducer;