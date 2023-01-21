import {
    Box,
    Button,
    Container, CssBaseline,
    Dialog,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import {useDispatch} from "react-redux";
import {addFilterOptions, clearFilterOptions} from "../redux/filterOptions/filterOptionsActions";

interface FilterProps {
    isFilterOpen: boolean,
    handleCloseFilterForm: () => void
}

export default function Filter({isFilterOpen, handleCloseFilterForm}: FilterProps) {
    const dispatch = useDispatch();
    const [minUserRate, setMinUserRate] = React.useState<string>('');
    const [minMetaScore, setMinMetaScore] = React.useState<string>('');
    const [minPrice, setMinPrice] = React.useState<string>('');
    const [maxPrice, setMaxPrice] = React.useState<string>('');
    const [platform, setPlatform] = React.useState<string>('');

    const handleClearAll = () => {
        setMinUserRate('');
        setMinMetaScore('');
        setMinPrice('');
        setMaxPrice('');
        setPlatform('');
        dispatch(clearFilterOptions());
    }

    const handleFilter = () => {
        dispatch(addFilterOptions({minUserRate, minMetaScore, minPrice, maxPrice, platform}))
    }

    return (
        <Dialog open={isFilterOpen} onClose={handleCloseFilterForm}>
            <Grid container gap={1}>
                <Container style={{height: 350}} component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" noValidate sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{minWidth: 120}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Minimum Users Rate</InputLabel>
                                            <Select
                                                label={'Minimum Rate'}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={minUserRate}
                                                onChange={(e: SelectChangeEvent<any>) => setMinUserRate(e.target.value)}
                                            >
                                                <MenuItem value={9}>9</MenuItem>
                                                <MenuItem value={8}>8</MenuItem>
                                                <MenuItem value={7}>7</MenuItem>
                                                <MenuItem value={6}>6</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{minWidth: 120}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Minimum MetaScore</InputLabel>
                                            <Select
                                                label={'Minimum Rate'}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={minMetaScore}
                                                onChange={(e: SelectChangeEvent<any>) => setMinMetaScore(e.target.value)}
                                            >
                                                <MenuItem value={9}>9</MenuItem>
                                                <MenuItem value={8}>8</MenuItem>
                                                <MenuItem value={7}>7</MenuItem>
                                                <MenuItem value={6}>6</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={minPrice}
                                        id="minPrice"
                                        label="Min Price"
                                        name="price"
                                        autoComplete="price"
                                        onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={maxPrice}
                                        id="maxPrice"
                                        label="Max Price"
                                        name="price"
                                        autoComplete="price"
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} paddingBottom={4}>
                                    <Box sx={{minWidth: 120}}>
                                        <FormControl fullWidth>
                                            <InputLabel
                                                id="demo-simple-select-label">{"Platform"}</InputLabel>
                                            <Select
                                                label={'Platform'}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                onChange={(e: SelectChangeEvent<any>) => setPlatform(e.target.value)}
                                                value={platform}
                                            >
                                                <MenuItem value={'playstation'}>Playstation</MenuItem>
                                                <MenuItem value={'xbox'}>XBox</MenuItem>
                                                <MenuItem value={'pc'}>PC</MenuItem>
                                                <MenuItem value={'switch'}>Switch</MenuItem>
                                                <MenuItem value={'wii'}>WII</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid container justifyContent={'center'}>
                                        <Button size={'large'} variant="contained" color={'info'}
                                                onClick={handleClearAll}>
                                            <Typography>
                                                Clear All
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid container justifyContent={'center'} onClick={handleFilter}>
                                        <Button size={'large'} variant="contained" color={'info'}>
                                            <Typography>
                                                Filter
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Dialog>)
}
