import {
    Box,
    Button,
    Container, CssBaseline,
    Dialog,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from "@mui/material";

interface FilterProps {
    isFilterOpen: boolean,
    handleCloseFilterForm: () => void
}

export default function Filter({isFilterOpen, handleCloseFilterForm}: FilterProps) {
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
                        <Grid container gap={2} justifyContent={'center'} alignItems={'center'}>
                            <Grid item>
                                <Switch
                                    edge="end"
                                />
                            </Grid>

                            <Grid item>
                                <Typography variant={"h6"}>Activate filter</Typography>
                            </Grid>
                        </Grid>
                        <Box component="form" noValidate sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{minWidth: 120}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                            <Select
                                                label={'Category'}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={'Sport'}>Sport</MenuItem>
                                                <MenuItem value={'Shooters'}>Shooters</MenuItem>
                                                <MenuItem value={'Multiplayer'}>Multiplayer</MenuItem>
                                                <MenuItem value={'Strategy'}>Strategy</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{minWidth: 120}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Minimum Rate</InputLabel>
                                            <Select
                                                label={'Minimum Rate'}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={1}>One Star</MenuItem>
                                                <MenuItem value={2}>Two Stars</MenuItem>
                                                <MenuItem value={3}>Three Stars</MenuItem>
                                                <MenuItem value={4}>Four Stars</MenuItem>
                                                <MenuItem value={5}>Five Stars</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="minPrice"
                                        label="Min Price"
                                        name="price"
                                        autoComplete="price"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="maxPrice"
                                        label="Max Price"
                                        name="price"
                                        autoComplete="price"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="succeedRate"
                                        label="Release Date"
                                        name="succeedRate"
                                        autoComplete="price"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{minWidth: 120}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                                            <Select
                                                label={'Platform'}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={'Playstation'}>Playstation</MenuItem>
                                                <MenuItem value={'XBox'}>XBox</MenuItem>
                                                <MenuItem value={'Steam'}>Steam</MenuItem>
                                                <MenuItem value={'Origin'}>Origin</MenuItem>
                                                <MenuItem value={'Windows'}>Windows</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid container justifyContent={'center'}>
                                        <Button size={'large'} variant="contained" color={'info'}>
                                            <Typography>
                                                Clear All
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid container justifyContent={'center'}>
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
