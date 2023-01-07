import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    List,
    TextField,
    Typography
} from "@mui/material";
import Axios from "axios";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {itemsMiniStore, StoreState} from "../redux/miniStore";
import {ItemType} from "../Item/Item";
import {removeAllItems} from "../redux/itemsList/itemsListActions";
import {CartItem, CartItemType} from "./CartItem";

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
        // TODO: add x button near to each item to remove him from the cart
        // dispatch(removeAllItems());
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
                                    To checkout this cart please enter your first name, last name and your phone number
                                </DialogContentText>
                                <List>
                                    {items.map((item: CartItemType) =>
                                        <CartItem item={item} key={item.product.id}/>
                                    )}
                                </List>
                                <Typography variant={'h6'}>
                                    Total Price of: {calculateTotal()} ₪
                                </Typography>

                                <Grid container gap={3}>
                                    <Grid item>
                                        <TextField
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            autoFocus
                                            margin="dense"
                                            id="firstname"
                                            label="First name"
                                            type="name"
                                            variant="standard"/>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                            autoFocus
                                            margin="dense"
                                            id="lastname"
                                            label="Last name"
                                            type="name"
                                            variant="standard"/>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            value={phoneNumber}
                                            autoFocus
                                            margin="dense"
                                            id="phone"
                                            label="Phone number"
                                            type="phone"
                                            variant="standard"/>
                                    </Grid>
                                </Grid>
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