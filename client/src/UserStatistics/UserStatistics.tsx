import React from "react";
import {Grid, Typography} from "@mui/material";
import {StatisticGraph} from "../StatisticGraph/StatisticGraph";

export const UserStatistics = () => {
    return (
        <>
            <Grid container alignItems={'center'} justifyContent={'center'}>
                <Typography variant={'h3'}>
                    User Statistics
                </Typography>
                <Grid container alignItems={'center'} justifyContent={'center'}>
                    <StatisticGraph/>
                </Grid>
            </Grid>
        </>
    )
}