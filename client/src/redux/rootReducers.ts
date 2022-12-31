// This file includes all the reducers of the project
import {combineReducers} from "redux";
import itemsListReducer from "./itemsList/itemsListReducers";
import filterOptionsReducer from "./filterOptions/filterOptionsReducers";

const rootReducer = combineReducers({
    items: itemsListReducer,
    filterOptions: filterOptionsReducer
});

export default rootReducer;