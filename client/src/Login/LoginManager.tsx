import {Button, Dialog, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SingUp/SignUp";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {auth} from "../Firebase/firebase";
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {SideBarList} from "../SideBar/SideBar";

export default function LoginManager() {
    const [isOpenSignIn, setIsOpenSignIn] = React.useState<boolean>(false);
    const [isOpenSignUp, setIsOpenSignUp] = React.useState<boolean>(false);
    const [authUser, setAuthUser] = React.useState<any>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<any>(null);
    React.useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null)
            }
        })

        return () => {
            listen();
        }
    }, [])

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Sign out successfully')
        }).catch((error) => {
            console.log(error)
        })
        handleCloseUserMenu();
    }

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

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
            {!authUser && <Grid container gap={2} justifyContent={'end'}>
                <Grid item>
                    <Button size={'large'} variant="contained" color={'info'}
                            onClick={() => setIsOpenSignIn(true)}>Sing In</Button>
                </Grid>
                <Grid item>
                    <Button size={'large'} variant="contained" color={'info'}
                            onClick={() => setIsOpenSignUp(true)}>Sing Up</Button>
                </Grid>
            </Grid>}
            {authUser && <Grid container gap={2} justifyContent={'end'}>
                <Box sx={{flexGrow: 0}}>
                    <SideBarList/>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: `right`,
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">My Orders</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Favorites</Typography>
                        </MenuItem>
                        <MenuItem onClick={userSignOut}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Grid>}
        </>
    )
}