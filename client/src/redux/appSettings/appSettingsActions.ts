import {AppSettingsTypes} from "./appSettingsTypes";
import {CURRENT_PAGE} from "./appSettingsReducers";

export const setCurrentPage = (currentPage: CURRENT_PAGE) => {
    return {
        type: AppSettingsTypes.SET_CURRENT_PAGE,
        payload: currentPage
    }
};