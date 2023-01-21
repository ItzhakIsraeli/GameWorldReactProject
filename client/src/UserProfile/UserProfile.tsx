import {deleteUser, EmailAuthProvider, reauthenticateWithCredential} from 'firebase/auth';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography
} from "@mui/material";
import {auth} from "../Firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {StoreState, userDataMiniStore} from "../redux/miniStore";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {useMutation} from "@apollo/client";
import {REMOVE_USER, UPDATE_USER} from "../GraphQl/Schema";
import {setCurrentPage} from "../redux/appSettings/appSettingsActions";
import {CURRENT_PAGE} from "../redux/appSettings/appSettingsReducers";
import {addUserDetails} from "../redux/userData/userDataActions";

export const UserProfile = () => {
    const userData = useSelector((state: StoreState) => userDataMiniStore(state).userData);
    const [firstName, setFirstName] = React.useState<string>(userData.userDetails.firstName);
    const [lastName, setLastName] = React.useState<string>(userData.userDetails.lastName);
    const [phone, setPhone] = React.useState<string>(userData.userDetails.phone);
    const [age, setAge] = React.useState<string>(userData.userDetails.age);
    const [address, setAddress] = React.useState<string>(userData.userDetails.address);
    const [state, setState] = React.useState<string>(userData.userDetails.state);
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [deletePopUp, setDeletePopUp] = React.useState<boolean>(false)
    const [password, setPassword] = React.useState<string>('');
    const [deleteFailed, setDeleteFailed] = React.useState<boolean>(false);
    const [removeUser] = useMutation(REMOVE_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    const dispatch = useDispatch();

    const handleDeleteUser = async () => {
        const user = auth.currentUser;
        if (user) {
            if (typeof user.email === "string") {
                await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password));
            }
        }

        if (user) {
            deleteUser(user).then(() => {
                console.log(
                    `User ${user.email} deleted successfully`
                );

                removeUser({
                    variables: {
                        userId: user.email
                    }
                }).then(() => {
                    setDeleteFailed(false);
                    dispatch(setCurrentPage(CURRENT_PAGE.HOME_PAGE));
                    setDeletePopUp(false);
                    console.log(`User ${user.email} removed from DB successfully`);
                }).catch((e) => {
                    setDeleteFailed(true);
                    console.log(e);
                })
            }).catch((e) => {
                setDeleteFailed(true);
                console.log(e);
            })
        }
    }

    const handleSubmit = () => {
        updateUser({
            variables: {
                userId: userData.email,
                body: {
                    firstName,
                    lastName,
                    phone,
                    age,
                    state,
                    address
                }
            }
        }).then(() => {
            dispatch(addUserDetails({
                firstName,
                lastName,
                phone,
                age,
                state,
                address
            }))
            console.log(`User ${userData.email} Update Successfully !`);
        }).catch((e) => console.log(e));
        setEditMode(false);
    }

    return (
        <>
            <Grid container justifyContent={'center'} paddingTop={4}>
                <Toolbar>
                    <Grid container gap={2} alignItems={'center'} justifyContent={'center'}>
                        <Grid item>
                            <Typography variant={'h3'} color={'primary'}>
                                Welcome {userData.userDetails.firstName} {userData.userDetails.lastName}
                            </Typography>
                        </Grid>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        disabled={!editMode}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        value={firstName}
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        disabled={!editMode}
                                        value={lastName}
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
                                        disabled={!editMode}
                                        value={phone}
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
                                        disabled={!editMode}
                                        value={age}
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
                                        disabled={!editMode}
                                        value={state}
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
                                        disabled={!editMode}
                                        value={address}
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
                                <Grid container justifyContent={'center'} alignItems={'center'} paddingTop={5} gap={10}>
                                    <Grid item>
                                        <Button variant={'contained'} color={'error'} title={'Delete User'}
                                                size={'large'} onClick={() => setDeletePopUp(true)}>
                                            <DeleteIcon/>
                                        </Button>
                                    </Grid>
                                    {!editMode ?
                                        <Grid item>
                                            <Button variant={'contained'} title={'Edit User'} size={'large'}
                                                    onClick={() => setEditMode(prevState => !prevState)}>
                                                <EditIcon/>
                                            </Button>
                                        </Grid> : <Grid item>
                                            <Button variant={'contained'} title={'Save User'} color={'success'}
                                                    size={'large'} onClick={handleSubmit}>
                                                <SaveIcon/>
                                            </Button>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Toolbar>
            </Grid>
            <Dialog open={deletePopUp} onClose={() => setDeletePopUp(false)}>
                <DialogTitle color={'error'}>Delete User Alert</DialogTitle>
                <>
                    <DialogContent>
                        <DialogContentText>
                            ⚠ Please enter your password to confirm user deletion ⚠
                        </DialogContentText>
                        <Grid container justifyContent={'center'} paddingTop={2}>
                            <TextField value={password} label={'Password'} type={'password'}
                                       onChange={(e) => setPassword(e.target.value)}/>
                        </Grid>
                        {deleteFailed && <DialogContentText>
                            <Typography color={'error'}>Wrong Password !</Typography>
                        </DialogContentText>
                        }
                    </DialogContent>
                </>
                <DialogActions>
                    <Grid container justifyContent={'center'} gap={10}>
                        <Button onClick={() => setDeletePopUp(false)} variant={'contained'}>Cancel</Button>
                        <Button onClick={handleDeleteUser} color={'error'} variant={'contained'}>Delete</Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    )
}