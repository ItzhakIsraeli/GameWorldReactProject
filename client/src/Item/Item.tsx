import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Grid, IconButton, ListItemButton, Typography} from "@mui/material";
import {ItemDialog} from "../ItemDialog/ItemDialog";
import {
    addItemToCart,
    addItemToFavorites,
    removeItem,
    removeItemFromFavorites
} from "../redux/itemsList/itemsListActions";
import {useDispatch, useSelector} from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {itemsMiniStore, StoreState, userDataMiniStore} from "../redux/miniStore";
import {CartItemType} from "../CartForm/CartItem";
import {useMutation} from "@apollo/client";
import {UPDATE_CART} from "../GraphQl/Schema";

export interface ItemType {
    id: string,
    name: string,
    description: string,
    price: number,
    image: string,
    limit: number,
    market: string
}

const isInCart = (id: string, items: CartItemType[]) => {
    let include = false;
    items.forEach((item) => {
        if (item.product.id === id) include = true;
    })
    return include;
}

export const Item = (item: ItemType) => {
    const [updateCart, {data}] = useMutation(UPDATE_CART);
    const user = useSelector((state: StoreState) => userDataMiniStore(state).userData);
    const [isOpen, setIsOpen] = React.useState(false);
    const items = useSelector((state: StoreState) => itemsMiniStore(state).CartList);
    const favorites: string[] = useSelector((state: StoreState) => itemsMiniStore(state).Favorites);
    const dispatch = useDispatch();

    const handleClose = () => setIsOpen(false)
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if (isInCart(item.id, items)) {
            updateCart({
                variables: {
                    userId: user.userId,
                    productId: item.id,
                    amount: 0
                }
            }).then(() => console.log('update cart in Item'));
            dispatch(removeItem(item));
        } else {
            updateCart({
                variables: {
                    userId: user.userId,
                    productId: item.id,
                    amount: 1
                }
            }).then(() => console.log('update cart in Item'));
            dispatch(addItemToCart(item, 1));
        }
        e.stopPropagation();
    }

    const addToFavorites = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (favorites.includes(item.id)) {
            dispatch(removeItemFromFavorites(item.id));
        } else {
            dispatch(addItemToFavorites(item.id));
        }
        e.stopPropagation();
    }

    return (<>
            <ItemDialog isOpen={isOpen} inCart={isInCart(item.id, items)} handleClose={handleClose} item={item}
                        handleOnClick={handleOnClick} addToFavorite={addToFavorites}
                        inFavorites={favorites.includes(item.id)}/>
            <ListItemButton onClick={() => setIsOpen(true)}>
                <Card sx={{display: 'flex', width: 500, height: 200}}>
                    <Grid container justifyContent={'center'} gap={12}>
                        <Grid item xs>.
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <CardContent>
                                    <Typography component="div" variant="h5">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Price: {item.price} ₪
                                    </Typography>
                                </CardContent>
                                <Grid container gap={1} alignItems={'end'}>
                                    {isInCart(item.id, items) ?
                                        <Button style={{marginLeft: 10}} variant={'contained'} color={'error'}
                                                onClick={(e) => handleOnClick(e)}>
                                            Remove Item
                                        </Button> :
                                        <Button style={{marginLeft: 10}} variant={'contained'}
                                                onClick={(e) => handleOnClick(e)}>
                                            Add Item
                                        </Button>
                                    }
                                    <IconButton title="Add To Favorites" onClick={(event) => addToFavorites(event)}>
                                        <FavoriteIcon color={favorites.includes(item.id) ? 'error' : "inherit"}/>
                                    </IconButton>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs>
                            <CardMedia
                                sx={{display: 'flex', width: 190, height: 180}}
                                component="img"
                                image={require(`../assets/${item.image}`)}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </ListItemButton>
        </>
    )
}