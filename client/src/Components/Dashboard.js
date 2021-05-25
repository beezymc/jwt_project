import React, { Fragment, useState, useEffect } from 'react';
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");

    //This function sets the welcome message 'Name' variable to be the name saved in the user's jwt token.
    const getProfile = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    };

    //This function removes the token and any user privileges should the user logout.
    const logout = async e => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logout Successful!")
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <Fragment>
            <h1>Dashboard {name}</h1>
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
        </Fragment>
    );
};

export default Dashboard;