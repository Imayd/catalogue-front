import React from "react";
import Login from './components/Login';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import ProtectedRoute from './helpers/protected.route';
import { Switch,BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path={["/", "/login"]} component={Login}/>
          <ProtectedRoute exact path="/home" component={Home}/>
          <Route path="*" component={()=> "404 NOT FOUND"}/>
        </Switch>
      </Router>

      {/*<div className="App">
        <Login/>
  </div>*/}
    </React.Fragment>
  );
}

export default App;
