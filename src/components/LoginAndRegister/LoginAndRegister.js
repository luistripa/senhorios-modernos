import './LoginAndRegister.css'
import {useEffect, useState} from "react";

const LoginAndRegister = () => {

    const [login, setLogin] = useState(true);

    function toggleLogin() {
        setLogin(!login);
    }

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return(
            <div className="main-container_LAR">
                <div style={{transform: `translate(${login ? 0 : 95}%, 0px)`, zIndex:1}} className="form-container_LAR">
                    <form className="form">
                        {
                            login ? <>
                                <h2 className="form-title">Login</h2>
                            </> : <>
                                <h2 className="form-title">Create Account</h2>
                                <input required="required" type="text" className="form-input" placeholder="Username"/>
                                <input required="required" type="text" className="form-input" placeholder="Name"/>
                            </>
                        }
                        <input required="required" type="email" className="form-input" placeholder="E-mail"/>
                        <input required="required" type="password" className="form-input" placeholder="Password"/>
                        {
                            login ? <></> : <>
                                <input required="required" type="password" className="form-input" placeholder="Confirm password"/>
                                <a className="form-link" href="#"><b>Forgot your Password?</b></a>
                            </>
                        }
                        <button className="form-button"> {login ? 'Login' : 'Sign Now'} </button>
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