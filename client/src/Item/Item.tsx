import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Grid, IconButton, ListItemButton, Typography} from "@mui/material";
import {ItemDialog} from "../ItemDialog/ItemDialog";
import {addItemToCart, removeItem} from "../redux/itemsList/itemsListActions";
import {useDispatch, useSelector} from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {itemsMiniStore, StoreState} from "../redux/miniStore";
import {CartItemType} from "../CartForm/CartItem";

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
    const [inCart, setInCart] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const items = useSelector((state: StoreState) => itemsMiniStore(state).ItemsList);
    const dispatch = useDispatch();

    const handleClose = () => setIsOpen(false)
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if (isInCart(item.id, items)) {
            setInCart(false)
            dispatch(removeItem(item));
        } else {
            setInCart(true)
            dispatch(addItemToCart(item, 1));
        }

        e.stopPropagation();
    }

    return (<>
            <ItemDialog isOpen={isOpen} inCart={inCart} handleClose={handleClose} item={item}
                        handleOnClick={handleOnClick}/>
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
                                    {inCart ?
                                        <Button style={{marginLeft: 10}} variant={'contained'} color={'error'}
                                                onClick={(e) => handleOnClick(e)}>
                                            Remove Item
                                        </Button> :
                                        <Button style={{marginLeft: 10}} variant={'contained'}
                                                onClick={(e) => handleOnClick(e)}>
                                            Add Item
                                        </Button>
                                    }
                                    <IconButton title="הוסף למועדפים">
                                        <FavoriteIcon color={false ? 'error' : "inherit"}/>
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