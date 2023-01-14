import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from "@mui/material/Grid";
import {Badge, IconButton} from "@mui/material";
import {AddShoppingCart} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {itemsMiniStore, StoreState} from "../redux/miniStore";
import {CartForm} from "../CartForm/CartForm";
import LoginManager from "../Login/LoginManager";
import Search from "../Search/Search";

export default function MainAppBar() {
    const items = useSelector((state: StoreState) => itemsMiniStore(state).CartList);

    const [isOpen, setIsOpen] = React.useState(false);

    const getTotalItems = () => {
        return items.length;
    }

    const handleClose = () => {
        setIsOpen(false)
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
                                <Search/>
                            </Grid>
                            <Grid item xs={2}>
                                <LoginManager/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
            <CartForm isOpen={isOpen} handleClose={handleClose}/>
        </>
    );
}