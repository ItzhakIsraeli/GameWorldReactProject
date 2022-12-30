import React from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Dialog,
    Grid,
    Typography
} from "@mui/material";
import {ItemType} from "../Item/Item";

interface ItemDialogProps {
    isOpen: boolean,
    handleClose: () => void,
    item: ItemType
}


export const ItemDialog = ({item, isOpen, handleClose}: ItemDialogProps) => {
    return (
        <Dialog
            scroll={'body'}
            open={isOpen}
            keepMounted
            onClose={handleClose}
        >
            <Card sx={{width: 500}}>
                <CardHeader
                    avatar={
                        <Avatar src={require(`../assets/${item.image}`)}/>
                    }
                    title={<Typography variant={'h3'}
                                       fontWeight={'bold'}>{`${item.name}`}</Typography>}
                />
                <CardMedia
                    component="img"
                    sx={{maxHeight: 400}}
                    image={require(`../assets/${item.image2}`)}
                    alt={item.name}
                />
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <Typography variant={'h5'}> Description: {item.description}</Typography>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <Typography variant={'h5'}> Market: {item.market}</Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Dialog>
    )
}