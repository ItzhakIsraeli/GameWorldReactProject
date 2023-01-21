import {
    Button,
    CircularProgress,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Grid,
    List,
    Typography
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {itemsMiniStore, StoreState, userDataMiniStore} from "../redux/miniStore";
import {CartItem, CartItemType} from "./CartItem";
import {TransitionGroup} from 'react-transition-group';
import {removeAllItems} from "../redux/itemsList/itemsListActions";

interface CartFormProps {
    isOpen: boolean,
    handleClose: () => void,
    handleCheckOut: () => void
}

export const CartForm = ({isOpen, handleClose, handleCheckOut}: CartFormProps) => {
    const items = useSelector((state: StoreState) => itemsMiniStore(state).CartList);
    const user = useSelector((state: StoreState) => userDataMiniStore(state).userData);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<number>();
    const timer2 = React.useRef<number>();

    const buttonSx = {
        ...(success && {
            bgcolor: 'green',
            '&:hover': {
                bgcolor: 'lightGreen',
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
            clearTimeout(timer2.current);
        };
    }, []);

    const calculateTotal = () => {
        return items.reduce((currentValue, item: CartItemType) =>
            currentValue += item.product.price * item.amount, 0
        )
    }

    const handleCancel = () => {
        handleClose();
    }

    const handleSubscribe = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
            timer2.current = window.setTimeout(() => {
                setSuccess(false);
                dispatch(removeAllItems());
                handleCheckOut();
                handleClose();
            }, 3000);
        }
    }

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Cart Checkout</DialogTitle>
                {
                    items.length > 0 ?
                        <>
                            <DialogContent>
                                <DialogContentText>
                                    Choose the amount of the items you wish to buy 🛒...
                                </DialogContentText>
                                {success ?
                                    <Grid container alignItems={'center'} justifyContent={'center'}><Fab
                                        aria-label="save"
                                        color="primary"
                                        sx={buttonSx}
                                    >
                                        <CheckIcon/>
                                    </Fab> </Grid> : <><List>
                                        <TransitionGroup>
                                            {items.map((item: CartItemType) =>
                                                <Collapse key={item.product.id}>
                                                    <CartItem item={item} key={item.product.id}/>
                                                </Collapse>
                                            )}
                                        </TransitionGroup>
                                    </List>
                                        <Typography variant={'h6'}>
                                            Total Price of: {calculateTotal()} ₪
                                        </Typography>
                                    </>}
                            </DialogContent>
                        </>
                        :
                        <DialogContent>
                            <DialogContentText>
                                Your cart is empty. Go ahead and add some cool stuff to it!
                            </DialogContentText>
                        </DialogContent>
                }

                <DialogActions>
                    <Grid container justifyContent={'center'} gap={10}>
                        <Button onClick={handleCancel} variant={'contained'}>Cancel</Button>
                        {items.length > 0 &&
                            <Button onClick={handleSubscribe} variant={'contained'} sx={buttonSx}
                                    disabled={user.fireBaseId === ""}>Checkout</Button>}

                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: 'success',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    )
}