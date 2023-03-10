import {UserDataTypes} from "./userDataTypes";

export const addUserData = (userData: { fireBaseId: string; email: string | null }) => {
    return {
        type: UserDataTypes.ADD_USER_DATA,
        payload: userData
    }
};

export const addUserDetails = (userData: {
    firstName: string,
    lastName: string,
    phone: string,
    age: string,
    state: string,
    address: string
}) => {
    return {
        type: UserDataTypes.ADD_USER_DETAILS,
        payload: userData
    }
};

export const addUserId = (userId: string) => {
    return {
        type: UserDataTypes.ADD_USER_ID,
        payload: userId
    }
};

