import './App.css';
import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

//components

import Dashboard from "./Components/Dashboard"
import Login from "./Components/Login"
import Register from "./Components/Register"

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //This function is used to check if a user has a valid JWT token. The user's status will then be passed as a prop to whatever page they visit.
  //A valid token is required for the Dashboard, but not for the Login or Register routes. The user will be redirected to the dashboard from register/login
  //if logged in, and will be redirected to login from the dashboard if not logged in.
  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token : localStorage.token }
      });

      const parseRes = await response.json();
      
      parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
      <Fragment>
        <Router>
          <div className="container"></div>
          <Switch>
            <Route exact path="/login" render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/register" render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/login"/>} />
            <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} /> : <Redirect to="/login"/>} />
          </Switch>
        </Router>
      </Fragment>
  );
}

export default App;
