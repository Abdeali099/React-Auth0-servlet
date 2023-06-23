import React, { useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import signupImage from '../assets/insurance.png'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useState } from 'react';




function Navbar() {

    let navigate = useNavigate();

    const [userJoinVia, setUserJoinVia] = useState("login")

    const { loginWithPopup } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();


    const handleOnSignup = () => {
        
        setUserJoinVia("signup");

        loginWithPopup({
            authorizationParams: {
                screen_hint: "signup",
            }
        });


    }

    const handleOnLogin = () => {

        setUserJoinVia("login");
        
        loginWithPopup();

    }

    const handleOnLogout = () => {

        logout();

        sessionStorage.removeItem("afa_token");
    }

    const getToken = async () => {

        const url = "http://localhost:8090/AnyTimeFileAccess/api/auth/authorization";

        const dataOfUser = {
            email: user.email,
            joinedVia: userJoinVia
        }

        /* Make Request To Server to get JWT Token */

        try {

            const response = await axios.post(url, JSON.stringify(dataOfUser));

            console.log(response.data);

            const {success,token}=response.data;

            if(success){
                sessionStorage.setItem("afa_token",token);
                navigate("/home");
            }

        } catch (error) {

            console.error('Error:', error.response ? error.response.data : error.message);
            alert("Error Occure !!!")

        }

    }

    useEffect(() => {

        console.log(user);

        if (isAuthenticated) {

            getToken();

        }

    }, [isAuthenticated])


    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="container-fluid">

                <Link className="navbar-brand" to="/index">AbdeTion</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>

                    </ul>

                    <span className="d-flex">

                        {

                            !isAuthenticated ? <>
                                <button type="button" className="btn btn-outline-primary authBtn" onClick={handleOnLogin}>

                                    Login


                                </button>

                                &nbsp;

                                <button type="button" className="btn btn-primary authBtn" onClick={handleOnSignup}>

                                    Signup

                                    <img src={signupImage} alt="test" />

                                </button>

                            </>
                                :

                                <button type="button" className="btn btn-primary authBtn" onClick={handleOnLogout}>

                                    Logout &nbsp;

                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>

                                </button>
                        }

                    </span>

                </div>

            </div>

        </nav>

    )
}

export default Navbar
