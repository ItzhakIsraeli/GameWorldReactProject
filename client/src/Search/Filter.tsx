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
                                            <InputLabel id="demo-simple-select-label">גיר</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={'אוטומט'}>אוטומט</MenuItem>
                                                <MenuItem value={'ידני'}>ידני</MenuItem>
                                                <MenuItem value={'ידני/אוטומט'}>ידני/אוטומט</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{minWidth: 120}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">דירוג מינימאלי</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={1}>כוכב אחד</MenuItem>
                                                <MenuItem value={2}>שני כוכבים</MenuItem>
                                                <MenuItem value={3}>שלושה כוכבים</MenuItem>
                                                <MenuItem value={4}>ארבעה כוכבים</MenuItem>
                                                <MenuItem value={5}>חמישה כוכבים</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="minPrice"
                                        label="מחיר מינימאלי"
                                        name="price"
                                        autoComplete="price"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="maxPrice"
                                        label="מחיר מקסימאלי"
                                        name="price"
                                        autoComplete="price"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="succeedRate"
                                        label="אחוזי הצלחה"
                                        name="succeedRate"
                                        autoComplete="price"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{minWidth: 120}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">אזור לימוד</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={'מרכז'}>מרכז</MenuItem>
                                                <MenuItem value={'דרום'}>דרום</MenuItem>
                                                <MenuItem value={'ירושלים והסביבה'}>ירושלים והסביבה</MenuItem>
                                                <MenuItem value={'צפון'}>צפון</MenuItem>
                                                <MenuItem value={'כל האזורים'}>כל האזורים</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid container justifyContent={'center'}>
                                        <Button size={'large'} variant="contained" color={'info'}>
                                            <Typography>
                                                נקה הכול
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid container justifyContent={'center'}>
                                        <Button size={'large'} variant="contained" color={'info'}>
                                            <Typography>
                                                בצע סינון
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
