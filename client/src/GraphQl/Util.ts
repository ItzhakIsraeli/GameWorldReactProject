import {useMutation, useSubscription} from "@apollo/client";
import {SUBSCRIPTION_QUERY, UPDATE_CART} from "./Schema";
import {updateProductLimit} from "../redux/itemsList/itemsListActions";
import {Dispatch} from "react";

const getCookie = (cookies: string, name: string) => {
    if (!cookies) {
        return null;
    }

    const split = cookies.split(';');
    for (let i = 0; i < split.length; i++) {
        let cookie = split[i].split('=');
        if (name === cookie[0].trim()) {
            return cookie[1]
        }
    }
}

export const CartUpdateSubscription = (dispatch: Dispatch<any>) => {
    const {data, loading} = useSubscription(
        SUBSCRIPTION_QUERY,
        {
            variables: {
                userId: getCookie(document.cookie, "id_token")
            },
            onSubscriptionData: (data) => {
                console.log(`message received with userId: ${getCookie(document.cookie, "id_token")}`, data)
                data?.subscriptionData?.data?.cartUpdate.length > 0 && dispatch(updateProductLimit(data?.subscriptionData?.data?.cartUpdate))
            }
        }
    );
}