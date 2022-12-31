import {Button, Dialog, Typography} from "@mui/material";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SingUp/SignUp";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function LoginManager() {
    const [isOpenSignIn, setIsOpenSignIn] = React.useState<boolean>(false);
    const [isOpenSignUp, setIsOpenSignUp] = React.useState<boolean>(false);

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

    return (
        <>
            <Box>
                <Dialog onClose={handleSignInClose} open={isOpenSignIn}>
                    <SignIn handleClose={handleSignInClose} openSignUp={openSignUpForm}/>
                </Dialog>
                <Dialog onClose={handleSignUpClose} open={isOpenSignUp}>
                    <SignUp handleClose={handleSignUpClose} openSignIn={openSignInForm}/>
                </Dialog>
            </Box>
            {<Grid container gap={2} justifyContent={'end'}>
                <Grid item>
                    <Button size={'large'} variant="contained" color={'info'}
                            onClick={() => setIsOpenSignIn(true)}>Sing In</Button>
                </Grid>
                <Grid item>
                    <Button size={'large'} variant="contained" color={'info'}
                            onClick={() => setIsOpenSignUp(true)}>Sing Up</Button>
                </Grid>
            </Grid>}
            {false && <Grid container gap={2} justifyContent={'end'}>
                <Typography variant={'h5'} fontWeight={'bold'}>
                    {`Hello ${'izhak'}`}
                </Typography>
            </Grid>}
        </>
    )
}