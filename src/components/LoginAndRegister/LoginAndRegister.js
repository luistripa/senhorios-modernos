import './LoginAndRegister.css'
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import API from "../../api"

const LoginAndRegister = () => {

    const [login, setLogin] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect( () => {
        if(searchParams.get('register') != null)
            setLogin(false);
        }, []);

    function toggleLogin() {
        setLogin(!login);
    }

    //Login
    const submitHandler = (e) => {
        e.preventDefault();

        if(login) {
            let user = {username: e.target.username.value, password: e.target.password.value};
            API.post("/users/auth", user).then(response => {
                let token = response.headers.get('Authorization');
                sessionStorage.setItem('token', token);
            } );
        }
        else{

        }
    }

    return(
            <div className="main-container_LAR">
                <div style={{transform: `translate(${login ? 0 : 95}%, 0px)`, zIndex:1}} className="form-container_LAR">
                    <form className="form" onSubmit={submitHandler}>
                        {
                            login ? <>
                                <h2 className="form-title">Login</h2>
                                <input name="username" required="required" type="text" className="form-input" placeholder="Username"/>
                                <input name="password" required="required" type="password" className="form-input" placeholder="Password"/>
                                <a className="form-link" href="#"><b>Forgot your Password?</b></a>
                            </> : <>
                                <h2 className="form-title">Create Account</h2>
                                <input name="username" required="required" type="text" className="form-input" placeholder="Username"/>
                                <input name="name" required="required" type="text" className="form-input" placeholder="Name"/>
                                <input name="email" required="required" type="email" className="form-input" placeholder="E-mail"/>
                                <input name="password" required="required" type="password" className="form-input" placeholder="Password"/>
                                <input name="conf-password" required="required" type="password" className="form-input" placeholder="Confirm password"/>
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
    )
}

export default LoginAndRegister