import {UserDataType} from "./userDataReducers";
import {UserDataTypes} from "./userDataTypes";

export const addUserData = (userData: { userId: string; email: string | null }) => {
    return {
        type: UserDataTypes.ADD_USER_DATA,
        payload: userData
    }
};