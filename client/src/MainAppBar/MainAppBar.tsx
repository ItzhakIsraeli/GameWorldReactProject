import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from "@mui/material/Grid";
import {
    Badge,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    Alert,
    DialogContent,
    DialogContentText, Button
} from "@mui/material";
import {AddShoppingCart} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {itemsMiniStore, StoreState} from "../redux/miniStore";
import {CartForm} from "../CartForm/CartForm";
import SignIn from "../Login/SignIn/SignIn";
import SignUp from "../Login/SingUp/SignUp";

export default function MainAppBar() {
    const items = useSelector((state: StoreState) => itemsMiniStore(state).ItemsList);
    const [isOpenSignIn, setIsOpenSignIn] = React.useState<boolean>(false);
    const [isOpenSignUp, setIsOpenSignUp] = React.useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);

    const openSignUpForm = () => {
        setIsOpenSignIn(false);
        setIsOpenSignUp(true);
    }

    const openSignInForm = () => {
        setIsOpenSignUp(false);
        setIsOpenSignIn(true);
    }

    const handleSignInClose = () => {
        setIsOpenSignIn(false);
    }

    const handleSignUpClose = () => {
        setIsOpenSignUp(false);
    }

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
                        <Grid item>
                            <IconButton onClick={() => setIsOpen(true)}>
                                <Badge badgeContent={getTotalItems()} color="error">
                                    <AddShoppingCart fontSize={'large'}/>
                                </Badge>
                            </IconButton>
                        </Grid>
                        <Grid container gap={2} justifyContent={'center'}>
                            <Typography variant={'h3'} fontWeight={'bold'}>
                                Shopping List
                            </Typography>
                        </Grid>
                        {<Grid container gap={2} justifyContent={'end'}>
                            <Grid item>
                                <Button size={'large'} variant="contained" color={'info'}
                                        onClick={() => setIsOpenSignIn(true)}>התחברות</Button>
                            </Grid>
                            <Grid item>
                                <Button size={'large'} variant="contained" color={'info'}
                                        onClick={() => setIsOpenSignUp(true)}>הרשמה</Button>
                            </Grid>
                        </Grid>}
                        {false && <Grid container gap={2} justifyContent={'end'}>
                            <Typography variant={'h5'} fontWeight={'bold'}>
                                {`שלום ${'izhak'}`}
                            </Typography>
                        </Grid>}
                    </Toolbar>
                </AppBar>
            </Box>
            <Dialog onClose={handleSignInClose} open={isOpenSignIn}>
                <SignIn handleClose={handleSignInClose} openSignUp={openSignUpForm}/>
            </Dialog>
            <Dialog onClose={handleSignUpClose} open={isOpenSignUp}>
                <SignUp handleClose={handleSignUpClose} openSignIn={openSignInForm}/>
            </Dialog>
            <CartForm isOpen={isOpen} handleClose={handleClose}/>
        </>
    );
}