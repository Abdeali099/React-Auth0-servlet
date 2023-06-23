import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home() {

    let navigate = useNavigate();

    useEffect(() => {

        if (!sessionStorage.getItem("afa_token")) {
            navigate('/index');
        }

    }, [])

    return (

        <>
            <div>


                <h1>This is a home page</h1>

                <h3>After login and signup user redirects here</h3>

            </div>

        </>


    )
}

export default Home
