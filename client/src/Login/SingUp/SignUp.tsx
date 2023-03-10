import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Copyright} from "../SignIn/SignIn";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../../Firebase/firebase";
import {useMutation} from "@apollo/client";
import {ADD_USER} from "../../GraphQl/Schema";
import {useDispatch, useSelector} from "react-redux";
import {StoreState, userDataMiniStore} from "../../redux/miniStore";
import {addUserData, addUserDetails} from "../../redux/userData/userDataActions";

const theme = createTheme();

interface SignUpProps {
    handleClose: () => void,
    openSignIn: () => void
}

export default function SignUp({handleClose, openSignIn}: SignUpProps) {
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [phone, setPhone] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [age, setAge] = React.useState<string>('');
    const [address, setAddress] = React.useState<string>('');
    const [state, setState] = React.useState<string>('');
    const [isError, setIsError] = React.useState<boolean>(false);
    const user = useSelector((state: StoreState) => userDataMiniStore(state).userData);
    const [addUser] = useMutation(ADD_USER);

    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            setIsError(false);
            dispatch(addUserData({
                fireBaseId: userCredentials.user.uid, email
            }));
            addUser({
                variables: {
                    body: {
                        userId: user.userId,
                        firstName,
                        lastName,
                        phone,
                        age,
                        state,
                        address,
                        email
                    }
                }
            }).then(() => dispatch(addUserDetails({
                firstName,
                lastName,
                address,
                age,
                state,
                phone
            }))).catch((e) => console.log('error in mutation', e));
            handleClose();
        }).catch((error) => {
            console.log(error);
            setIsError(true);
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
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sing Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => setFirstName(event.target.value)}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => setLastName(event.target.value)}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => setPhone(event.target.value)}
                                    autoComplete="tel"
                                    name="phone number"
                                    required
                                    fullWidth
                                    id="phone number"
                                    label="Phone Number"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => setAge(event.target.value)}
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                    autoComplete="age"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => setState(event.target.value)}
                                    required
                                    fullWidth
                                    id="state"
                                    label="State"
                                    name="state"
                                    autoComplete="country"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => setAddress(event.target.value)}
                                    autoComplete="address"
                                    name="address"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Adress"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        {isError &&
                            <Typography color={'error'}>
                                The Email Wrong or already exist in the system.
                                Try to Log In or Sing Up with different Email.
                            </Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sing Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={openSignIn}>
                                    Do you have account already ? sign in now !
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