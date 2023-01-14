import {UserDataTypes} from "./userDataTypes";

export interface UserDataType {
    userId: string,
    fireBaseId: string,
    email: string | null
}

export interface UserDataState {
    userData: UserDataType
}

interface actionI {
    type: string,
    payload: {
        fireBaseId: string,
        email: string | null,
        userId: string
    }
}

const initialState: UserDataState = {
    userData:
        {
            userId: '',
            fireBaseId: '',
            email: ''
        }
};

const userDataReducers = (state: UserDataState = initialState, action: actionI) => {
    switch (action.type) {
        case UserDataTypes.ADD_USER_DATA:
            return {
                ...state,
                userData: {
                    fireBaseId: action.payload.fireBaseId,
                    email: action.payload.email,
                    userId: state.userData.userId
                }
            };
        case UserDataTypes.ADD_USER_ID:
            return {
                ...state,
                userData: {
                    userId: action.payload
                }
            }
        default:
            return state
    }
}

export default userDataReducers;