import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from "@mui/material/Grid";
import {Badge, IconButton} from "@mui/material";
import {AddShoppingCart} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {appSettingsMiniStore, itemsMiniStore, StoreState, userDataMiniStore} from "../redux/miniStore";
import {CartForm} from "../CartForm/CartForm";
import LoginManager from "../Login/LoginManager";
import Search from "../Search/Search";
import {CURRENT_PAGE} from "../redux/appSettings/appSettingsReducers";
import {useMutation} from "@apollo/client";
import {CHECKOUT} from "../GraphQl/Schema";
import {CartItemType} from "../CartForm/CartItem";

export default function MainAppBar() {
    const user = useSelector((state: StoreState) => userDataMiniStore(state).userData);
    const items = useSelector((state: StoreState) => itemsMiniStore(state).CartList);
    const currentPage = useSelector((state: StoreState) => appSettingsMiniStore(state).currentPage);
    const [isOpen, setIsOpen] = React.useState(false);
    const [checkout, {data}] = useMutation(CHECKOUT);


    const getTotalItems = () => {
        return items.length;
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleCheckOut = () => {
        const itemsCheckout: { id: string; amount: number; }[] = [];
        const totalPrice = items.reduce((currentValue, item: CartItemType) =>
            currentValue += item.product.price * item.amount, 0
        );

        items.forEach((item: CartItemType) => {
            itemsCheckout.push({id: item.product.id, amount: item.amount})
        })
        checkout({
            variables: {
                userId: user.userId, order: {
                    firstName: user.userDetails.firstName,
                    lastName: user.userDetails.lastName,
                    userId: user.userId,
                    date: new Date().toDateString(),
                    phone: user.userDetails.phone,
                    totalPrice,
                    products: itemsCheckout
                }
            }
        }).then(console.log).catch((e) => console.log);
    }

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container gap={2} alignItems={'center'} justifyContent={'center'}>
                            <Grid item xs={1}>
                                <IconButton onClick={() => setIsOpen(true)}>
                                    <Badge badgeContent={getTotalItems()} color="error">
                                        <AddShoppingCart fontSize={'large'}/>
                                    </Badge>
                                </IconButton>
                            </Grid>
                            <Grid container justifyContent={'center'} xs>
                                {currentPage === CURRENT_PAGE.HOME_PAGE && <Search/>}
                            </Grid>
                            <Grid item xs={2}>
                                <LoginManager/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
            <CartForm isOpen={isOpen} handleClose={handleClose} handleCheckOut={handleCheckOut}/>
        </>
    );
}