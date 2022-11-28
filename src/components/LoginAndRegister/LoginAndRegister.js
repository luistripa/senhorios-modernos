import './LoginAndRegister.css'
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import API from "../../api"
import {
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    FormControl,
    Button,
    IconButton,
    Alert
} from "@mui/material";
import {VisibilityOff, Visibility, Close} from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";

const LoginAndRegister = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(true);
    const [snackBarAlert, setSnackBarAlert] = useState(undefined);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);


    useEffect( () => {
        setLogin(props.toggleLogin);
        }, [props.toggleLogin]);


    function toggleLogin() {
        setLogin(!login);
    }

    const navigate = useNavigate();
    //Login
    const submitHandler = (e) => {
        e.preventDefault();


        if(!login) {
            let user = {
                username: e.target.username.value, name: e.target.name.value, email: e.target.name.value,
                password: e.target.password.value
            };
            if(e.target.password.value !== e.target.confPassword.value) {
                setSnackBarOpen(true);
                setSnackBarAlert(
                    <Alert severity="error">Passwords do not match.</Alert>
                );
                return;
            }
            else{
                API.post("/users/", user).then(response => {});
            }

        }
        let user = {username: e.target.username.value, password: e.target.password.value};
            API.post("/users/auth", user).then(response => {
                if(response.status === 200) {
                    let token = response.headers.get('Authorization');
                    sessionStorage.setItem('token', token);
                    props.onClose();
                    navigate("/my-houses");
                }
            }).catch(() => {
                setSnackBarOpen(true);
                setSnackBarAlert(
                    <Alert severity="error">Invalid Login.</Alert>
                );
            });

        }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        outline: 'none',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return(
        <>
            <Modal open={open}>
                <div className="Modal_Home" style={style}>

                    <div className="main-container_LAR">
                        <div style={{transform: `translate(${login ? 0 : 95}%, 0px)`, zIndex:1}} className="form-container_LAR">
                            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={submitHandler}>
                                {
                                    login ? <>
                                        <h2 className="form-title">Login</h2>
                                        <FormControl variant="outlined">
                                            <TextField style={{marginBottom: '1%'}} name="username" required type="text" placeholder="Username"
                                                       className="form-input" variant="outlined" />
                                        </FormControl>

                                        <FormControl variant="outlined">
                                            <OutlinedInput
                                                name="password" required type={showPassword ? 'text' : 'password'} className="form-input"
                                                placeholder="Password" endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        <a className="form-link" href="#"><b>Forgot your Password?</b></a>
                                    </> : <>
                                        <h2 className="form-title">Create Account</h2>
                                        <FormControl variant="outlined">
                                            <TextField style={{marginBottom: '2%'}}name="username" required type="text" placeholder="Username"
                                                       className="form-input" variant="outlined" />
                                        </FormControl>

                                        <FormControl variant="outlined">
                                            <TextField name="name" required type="text" placeholder="Name"
                                                       className="form-input" variant="outlined" />
                                        </FormControl>

                                        <FormControl variant="outlined">
                                            <TextField style={{marginTop: '2%', marginBottom: '1%'}} name="email" required type="email" placeholder="E-mail"
                                                       className="form-input" variant="outlined" />
                                        </FormControl>

                                        <FormControl variant="outlined">
                                            <OutlinedInput
                                                name="password" required type={showPassword ? 'text' : 'password'} className="form-input"
                                                placeholder="Password" endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            />
                                        </FormControl>

                                            <FormControl variant="outlined">
                                                <OutlinedInput
                                                    name="confPassword" required type={showPassword ? 'text' : 'password'} className="form-input"
                                                    placeholder="Confirm Password" endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                />
                                            </FormControl>
                                    </>
                                }
                                <button type="submit" className="form-button"> {login ? 'Login' : 'Sign Now'} </button>
                            </form>
                        </div>

                        <div style={{transform: `translate(${login ? 0 : -95}%, 0px)`}} className="change-form_LAR">

                            {
                                login ?  <>
                                    <h3 className="form-title">Don't have an account with us?</h3>
                                    <h5 className="form-title-2">Create yours right now!</h5>
                                </> : <>
                                    <h3 className="form-title">Already have an account?</h3>
                                    <h5 className="form-title-2">Enter now to keep connected!</h5>
                                </>
                            }
                            <button className="form-button" onClick={toggleLogin}> {login ? 'Create an account' : 'Login Now'}  </button>
                        </div>
                    </div>
                    <Snackbar open={snackBarOpen} onClose={() => setSnackBarOpen(false)} autoHideDuration={6000} message={'Invalid Login'}>
                        {snackBarAlert}
                    </Snackbar>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'end' , width: '100%', zIndex: 100}}>
                        <IconButton sx={{margin: '10px'}} onClick={props.onClose}>
                            <Close fontSize='large'/>
                        </IconButton>
                    </div>
                </div>
            </Modal>

        </>



    )
}

export default LoginAndRegister