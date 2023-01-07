import {
    Avatar,
    FormControl,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import React from "react";
import {ItemType} from "../Item/Item";
import {useDispatch, useSelector} from "react-redux";
import {updateAmount} from "../redux/itemsList/itemsListActions";
import {itemsMiniStore, StoreState} from "../redux/miniStore";
import {useMutation} from "@apollo/client";
import {UPDATE_CART} from "../GraphQl/Schema";

interface CartItemProps {
    item: CartItemType
}

export interface CartProduct {
    id: string,
    amount: number
}

export interface CartItemType {
    product: ItemType,
    amount: number
}

export const CartItem = ({item}: CartItemProps) => {
    const [updateCart, {data}] = useMutation(UPDATE_CART,{
            variables: {
                productId: '638e2818ce5ee77b9a86b117', amount: 7
            }
    });

    const [limit, setLimit] = React.useState(item.amount);
    const [limitArr, setLimitArr] = React.useState<number[]>();
    const dispatch = useDispatch();
    const cartList = useSelector((state: StoreState) => itemsMiniStore(state).CartList);

    React.useEffect(() => {
        cartList.map((cartItem: CartItemType) => {
            if (item.product.id === cartItem.product.id) {
                setLimitArr(new Array(cartItem.product.limit).fill(0))
            }
        })
    }, [cartList])

    React.useEffect(() => {
        setLimitArr(new Array(item.product.limit).fill(0));
    }, [limit])

    const handleChange = (e: SelectChangeEvent<number | undefined>) => {
        updateCart();
        setLimit(Number(e.target.value))
        dispatch(updateAmount(item.product, Number(e.target.value)))
    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={require(`../assets/${item.product.image}`)}/>
            </ListItemAvatar>
            <ListItemText primary={item.product.name} secondary={`${item.product.price} ₪`}/>
            <FormControl sx={{m: 1, minWidth: 120}} size="small">
                <Select
                    value={limit}
                    label={limit}
                    onChange={(e) => handleChange(e)}
                >
                    {
                        limitArr?.map((item, key) =>
                            <MenuItem value={key + 1} key={key}>{key + 1} </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </ListItem>)
}