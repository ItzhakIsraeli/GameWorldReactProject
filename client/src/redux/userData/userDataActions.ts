import {UserDataType} from "./userDataReducers";
import {UserDataTypes} from "./userDataTypes";

export const addUserData = (userData: UserDataType) => {
    return {
        type: UserDataTypes.ADD_USER_DATA,
        payload: userData
    }
};