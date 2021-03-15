import React from "react";
import Login from './components/Login';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import { Switch,BrowserRouter as Router, Route } from "react-router-dom";
import Navbar2 from "./components/layout/Navbar2";
import { NavItem } from "./components/layout/Navbar2";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path={["/", "/login"]} component={Login}/>
          <Route exact path="/home" component={Home}/>
        </Switch>
      </Router>

      {/*<div className="App">
        <Login/>
  </div>*/}
    </React.Fragment>
  );
}

export default App;
