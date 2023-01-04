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
import React, {useEffect} from "react";
import {ItemType} from "../Item/Item";
import {useDispatch} from "react-redux";
import {updateAmount} from "../redux/itemsList/itemsListActions";

interface CartItemProps {
    item: CartItemType
}

export interface CartItemType {
    product: ItemType,
    amount: number
}

export const CartItem = ({item}: CartItemProps) => {

    const [limit, setLimit] = React.useState(item.amount);
    const [limitArr, setLimitArr] = React.useState<number[]>();
    const dispatch = useDispatch();
    useEffect(() => {
        setLimitArr(new Array(item.product.limit).fill(0));
    }, [limit])

    const handleChange = (e: SelectChangeEvent<number | undefined>) => {
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