import React from "react";
import Login from './components/Login';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import { Switch,BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/login"]} component={Login}/>
          <Route exact path="/home" component={Home}/>
        </Switch>
      </div>
      </Router>

      {/*<div className="App">
        <Login/>
  </div>*/}
    </React.Fragment>
  );
}

export default App;
