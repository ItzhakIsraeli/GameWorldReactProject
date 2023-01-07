import {ItemsListTypes} from "./itemsListTypes";
import {ItemType} from "../../Item/Item";
import {CartItemType, CartProduct} from "../../CartForm/CartItem";

export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    image: string,
    market: string,
    limit: number
}

export interface ItemsState {
    CartList: [],
    Products: []
}

interface actionI {
    type: string,
    payload: {
        product: ItemType,
        amount: number,
        cartProducts: CartProduct[],
        products: Product[],
    }
}

const initialState: ItemsState = {
    CartList: [],
    Products: []
};

const itemsListReducer = (state: ItemsState = initialState, action: actionI) => {
    switch (action.type) {
        case ItemsListTypes.LOAD_PRODUCTS:
            return {
                ...state,
                Products: action.payload
            }
        case ItemsListTypes.ADD_ITEM_TO_CART:
            return {
                ...state,
                CartList: [...state.CartList, {product: action.payload.product, amount: action.payload.amount}]
            };
        case ItemsListTypes.UPDATE_PRODUCT_LIMIT:
            return {
                ...state,
                Products: state.Products.map((product:Product)=>{
                    return action.payload.cartProducts.map((item)=>{
                        if (product.id === item.id){
                            product= {...product,limit: product.limit + item.amount}
                        }
                        return product
                    })
                }).flat(),
                CartList: state.CartList.map((cartItem:CartItemType)=>{
                    return action.payload.cartProducts.map((item)=>{
                        if (cartItem.product.id === item.id){
                            cartItem= {...cartItem,product:{...cartItem.product,limit: cartItem.product.limit + item.amount}}
                        }
                        return cartItem
                    })
                }).flat()
            };
            // case ItemsListTypes.UPDATE_PRODUCT_LIMIT:
            // return {
            //     ...state,
            //     Products: state.Products.map((prod:Product)=>{
            //         if (prod.id === action.payload.cartProducts[0].id){
            //            prod= {...prod,limit: prod.limit + action.payload.cartProducts[0].amount}
            //         }
            //         return prod
            //     })
            // };
        case ItemsListTypes.UPDATE_ITEM_IN_CART:
            return {
                ...state,
                CartList: state.CartList.map((item: CartItemType) => {
                    if (item.product.id === action.payload.product.id) {
                        item.amount = action.payload.amount
                    }
                    return item;
                })
            };
        case ItemsListTypes.REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                CartList: state.CartList.filter((item: CartItemType) => {
                        return item.product.id !== action.payload.product.id
                    }
                )
            };
        case ItemsListTypes.REMOVE_ALL_ITEMS_FROM_CART:
            return {
                ...state,
                CartList: []
            }
        default:
            return state
    }
};

export default itemsListReducer;