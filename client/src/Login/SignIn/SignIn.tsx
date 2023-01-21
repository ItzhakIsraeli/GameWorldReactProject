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
import {auth} from "../../Firebase/firebase";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {GET_USER} from "../../GraphQl/Schema";
import {client} from "../../App";
import {addUserDetails} from "../../redux/userData/userDataActions";

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
    const [email, setEmail] = React.useState<string>('');
    const [error, setError] = React.useState<boolean>(false);
    const [password, setPassword] = React.useState<string>('');
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            client
                .query({
                    query: GET_USER,
                    variables: {
                        userId: email
                    }
                })
                .then((result: any) => {
                        dispatch(addUserDetails(result.data.getUser));
                    }
                ).catch((error) => {
                console.log(error);
            })

            handleClose();
        }).catch((error) => {
            console.log(error);
            setError(true);
        });
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
                        Sing In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            onChange={(event) => setEmail(event.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="UserName / Email"
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
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {error &&
                            <Typography color={'red'}>Sorry your Username and/or Password are incorrect. please try
                                again </Typography>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sing In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Button onClick={openSignUp}>
                                    <Typography variant={'caption'}>
                                        You haven't account? create now !
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