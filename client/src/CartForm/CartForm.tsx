import {
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    List,
    Typography
} from "@mui/material";
import Axios from "axios";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {itemsMiniStore, StoreState} from "../redux/miniStore";
import {ItemType} from "../Item/Item";
import {CartItem, CartItemType} from "./CartItem";
import {TransitionGroup} from 'react-transition-group';

interface CartFormProps {
    isOpen: boolean,
    handleClose: () => void
}

export const CartForm = ({isOpen, handleClose}: CartFormProps) => {
    const items = useSelector((state: StoreState) => itemsMiniStore(state).CartList);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");

    const calculateTotal = () => {
        return items.reduce((currentValue, item: CartItemType) =>
            currentValue += item.product.price * item.amount, 0
        )
    }

    const clearData = () => {
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
    }

    const handleCancel = () => {
        clearData();
        handleClose();
    }

    const handleSubscribe = () => {
        Axios.post('http://localhost:3001/checkout', {
            firstName, lastName, phone: phoneNumber, products: items.map((item: ItemType) => item.id)

        }).then(() => console.log(`send items: ${items}`));
        clearData();
        handleClose();
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
                                <List>
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
                    <Grid container justifyContent={'center'}>
                        <Button onClick={handleCancel}>Cancel</Button>
                        {items.length > 0 && <Button onClick={handleSubscribe}
                                                     disabled={!(firstName.length > 0 && lastName.length > 0 && phoneNumber.length > 0)}>Checkout</Button>}
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    )
}