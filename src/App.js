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
import FamilleProduits from "./components/FamilleProduits";
import Bilan from "./components/Bilan";
import Template from "./components/layout/Template";

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
          <ProtectedRoute
            exact
            path="/administration/famille-produits"
            component={FamilleProduits}
          />
          <ProtectedRoute
            exact
            path="/administration/bilans"
            component={Bilan}
          />
          <ProtectedRoute
            exact
            path="/produits/monetique"
            component={Template}
          />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
