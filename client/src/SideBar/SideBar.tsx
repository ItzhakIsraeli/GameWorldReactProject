import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from "@mui/material/IconButton";
import {Divider, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../redux/appSettings/appSettingsActions";
import {CURRENT_PAGE} from "../redux/appSettings/appSettingsReducers";
import {styled, useTheme} from "@mui/material/styles";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export const SideBarList = () => {
    const dispatch = useDispatch()
    const theme = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isNeedAlert, setIsNeedAlert] = React.useState(false);

    const handleClick = () => {
        if (true) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
            setIsNeedAlert(true);
        }
    }

    const handleClose = () => {
        setIsNeedAlert(false);
    }

    const handleLogOut = () => {
        // dispatch(setCurrentUser(false))
        dispatch(setCurrentPage(CURRENT_PAGE.HOME_PAGE))
    }

    const handleHomeClick = ()=>{
        setIsOpen(false);
        dispatch(setCurrentPage(CURRENT_PAGE.HOME_PAGE))
    }

    const list = () => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={() => setIsOpen(false)}
            onKeyDown={() => setIsOpen(false)}
        >
            <List>
                <ListItemButton onClick={() => dispatch(setCurrentPage(CURRENT_PAGE.PROFILE_PAGE))}>
                    <ListItemIcon>
                        <AccountCircleIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Profile'}/>
                </ListItemButton>
                <ListItemButton onClick={() => dispatch(setCurrentPage(CURRENT_PAGE.MY_ORDERS_PAGE))}>
                    <ListItemIcon>
                        <FormatListBulletedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'My Orders'}/>
                </ListItemButton>
                <ListItemButton onClick={() => dispatch(setCurrentPage(CURRENT_PAGE.FAVORITES_PAGE))}>
                    <ListItemIcon>
                        <FavoriteIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Favorites'}/>
                </ListItemButton>
                <ListItemButton onClick={handleLogOut}>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Log Out'}/>
                </ListItemButton>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <IconButton onClick={handleClick} title="Open settings">
                    <AccountCircleIcon fontSize={'large'} style={{color: 'white'}}/>
                </IconButton>
                <Drawer
                    anchor={'right'}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleHomeClick}>
                            Home Page
                            {theme.direction === 'rtl' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    {list()}
                    <Divider/>
                </Drawer>
            </React.Fragment>
        </div>
    );
}
