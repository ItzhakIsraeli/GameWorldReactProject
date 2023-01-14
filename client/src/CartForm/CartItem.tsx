import {
    Avatar,
    FormControl,
    Grid,
    IconButton,
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
import {removeItem, updateAmount} from "../redux/itemsList/itemsListActions";
import {itemsMiniStore, StoreState, userDataMiniStore} from "../redux/miniStore";
import {useMutation} from "@apollo/client";
import {UPDATE_CART} from "../GraphQl/Schema";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};
export const CartItem = ({item}: CartItemProps) => {

    const [updateCart, {data}] = useMutation(UPDATE_CART);
    const user = useSelector((state: StoreState) => userDataMiniStore(state).userData);


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
        console.log(item.amount);
        updateCart({
            variables: {
                userId: user.userId,
                productId: item.product.id,
                amount: Number(e.target.value)
            }
        }).then(() => console.log('update cart in CartItem => Change'));
        setLimit(Number(e.target.value))
        dispatch(updateAmount(item.product, Number(e.target.value)))
    }

    const handleRemoveItem = () => {
        updateCart({
            variables: {
                userId: user.userId,
                productId: item.product.id,
                amount: 0
            }
        }).then(() => console.log('update cart in CartItem => Remove'));
        dispatch(removeItem(item.product));
    }

    return (
        <ListItem>
            <Grid container justifyContent={'center'} alignItems={'center'} gap={1}>
                <IconButton title="Remove Item" onClick={handleRemoveItem}>
                    <DeleteOutlineIcon fontSize={'medium'} color={'error'}/>
                </IconButton>
                <ListItemAvatar>
                    <Avatar src={require(`../assets/${item.product.image}`)}/>
                </ListItemAvatar>
                <ListItemText primary={item.product.name} secondary={`${item.product.price} ₪`}/>
                <FormControl sx={{m: 1, minWidth: 100, justifyContent: 'center'}} size="small">
                    <Select
                        MenuProps={MenuProps}
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
            </Grid>
        </ListItem>)
}