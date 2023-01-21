import {AppSettingsTypes} from "./appSettingsTypes";

export enum CURRENT_PAGE {
    HOME_PAGE = 'HOME_PAGE',
    PROFILE_PAGE = 'PROFILE_PAGE',
    FAVORITES_PAGE = 'FAVORITES_PAGE',
    USER_STATISTICS = 'USER_STATISTICS'
}

export interface AppSettingsState {
    currentPage: CURRENT_PAGE
}

interface actionI {
    type: string,
    payload: {
        page: CURRENT_PAGE
    }
}

const initialState: AppSettingsState = {
    currentPage: CURRENT_PAGE.HOME_PAGE
};

const filterOptionsReducer = (state: AppSettingsState = initialState, action: actionI) => {
    switch (action.type) {
        case AppSettingsTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };

        default:
            return state
    }
}

export default filterOptionsReducer;