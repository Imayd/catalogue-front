import React from "react";
import Login from "./components/Login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import ProtectedRoute from "./helpers/protected.route";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Administration from "./components/Administration";
import TypeClient from "./components/TypeClient";
import Page404 from "./components/layout/404.page";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path={["/", "/home"]} component={Home} />
          <ProtectedRoute
            exact
            path="/administration/markets-maintenance"
            component={Administration}
          />
          <ProtectedRoute
            exact
            path="/administration"
            component={Administration}
          />
          <ProtectedRoute
            exact
            path="/administration/type-client"
            component={TypeClient}
          />

          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
