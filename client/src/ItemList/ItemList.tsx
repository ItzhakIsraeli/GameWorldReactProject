import React from 'react';
import {Box, Grid, List, ListItem} from "@mui/material";
import {Item, ItemType} from "../Item/Item";

interface ItemListProps {
    data: [ItemType] | never[]
}

export const ItemList = ({data}: ItemListProps) => {
    return (
        <Box>
            <List>
                <Grid container justifyContent={'center'}>
                    {data.map((item) =>
                        <Grid key={item._id}>
                            <ListItem disablePadding>
                                <Item {...item} />
                            </ListItem>
                        </Grid>
                    )}
                </Grid>
            </List>
        </Box>
    )
}