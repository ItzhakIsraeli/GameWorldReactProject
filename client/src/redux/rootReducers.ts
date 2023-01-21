import {combineReducers} from "redux";
import itemsListReducer from "./itemsList/itemsListReducers";
import filterOptionsReducer from "./filterOptions/filterOptionsReducers";
import appSettingsReducers from "./appSettings/appSettingsReducers";
import userDataReducers from "./userData/userDataReducers";

const rootReducer = combineReducers({
    items: itemsListReducer,
    filterOptions: filterOptionsReducer,
    userData: userDataReducers,
    appSettings: appSettingsReducers
});

export default rootReducer;