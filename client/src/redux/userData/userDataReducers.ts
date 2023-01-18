import {UserDataTypes} from "./userDataTypes";

export interface UserDataType {
    userId: string,
    fireBaseId: string,
    email: string | null,
    userDetails: {
        firstName: string,
        lastName: string,
        phone: string,
        age: string,
        state: string,
        address: string
    }
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
        userDetails: {
            firstName: string,
            lastName: string,
            phone: string,
            age: string,
            state: string,
            address: string
        }
    }
}

const initialState: UserDataState = {
    userData:
        {
            userId: '',
            fireBaseId: '',
            email: '',
            userDetails: {
                firstName: '',
                lastName: '',
                phone: '',
                age: '',
                state: '',
                address: ''
            }
        }
};

const userDataReducers = (state: UserDataState = initialState, action: actionI) => {
    switch (action.type) {
        case UserDataTypes.ADD_USER_DATA:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    fireBaseId: action.payload.fireBaseId,
                    email: action.payload.email,
                    userId: state.userData.userId
                }
            };
        case UserDataTypes.ADD_USER_ID:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    userId: action.payload
                }
            }
        case UserDataTypes.ADD_USER_DETAILS:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    userDetails: action.payload
                }
            }
        default:
            return state
    }
}

export default userDataReducers;