import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useDispatch} from "react-redux";

export const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            Copyright © Gamers World {new Date().getFullYear()}
        </Typography>
    );
}

const theme = createTheme();

interface SignInProps {
    handleClose: () => void,
    openSignUp: () => void
}

export default function SignIn({handleClose, openSignUp}: SignInProps) {
    // const usersList = useSelector((state: UsersState) => usersMiniStore(state).UserList)
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // usersList.forEach(user => {
        //     if ((user.mail === email) && user.password === password) {
        //         dispatch(setCurrentUser(user));
        //         handleClose();
        //     }
        // })

        setError(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: '#2196f3'}}>
                        <SportsEsportsIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        התחברות
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            onChange={(event) => setEmail(event.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="שם משתמש / כתובת מייל"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={(event) => setPassword(event.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="סיסמה"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {error && <Typography color={'red'}>שם משתמש או סיסמה שגויים, נסה שוב </Typography>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            התחבר
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button>
                                    <Typography variant={'caption'}>
                                        שכחתי סיסמה
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={openSignUp}>
                                    <Typography variant={'caption'}>
                                        אין לך חשבון? צור עכשיו
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright/>
            </Container>
        </ThemeProvider>
    );
}