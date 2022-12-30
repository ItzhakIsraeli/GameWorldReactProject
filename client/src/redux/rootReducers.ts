// This file includes all the reducers of the project
import {combineReducers} from "redux";
import itemsListReducer from "./itemsList/itemsListReducers";

const rootReducer = combineReducers({
    items: itemsListReducer
});

export default rootReducer;