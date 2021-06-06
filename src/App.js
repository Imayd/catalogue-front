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
import Theme from "./components/Theme";
import TypeService from "./components/TypeService";
import CategorieService from "./components/CategorieService";
import Service from "./components/Service";
import GroupementStatuts from "./components/GroupementStatuts";
import GroupementMotifs from "./components/GroupementMotifs";
import Statut from "./components/Statut";
import Motif from "./components/Motif";
import Reporting from "./components/Reporting";
import Carte from "./components/Carte";

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
          <ProtectedRoute exact path="/produits/" component={Theme} />
          <ProtectedRoute
            exact
            path="/produits/maintenance-prerequis"
            component={GroupementStatuts}
          />
          <ProtectedRoute
            exact
            path="/produits/maintenance-prerequis/groupement-statuts"
            component={GroupementStatuts}
          />
          <ProtectedRoute
            exact
            path="/produits/maintenance-prerequis/groupement-motifs"
            component={GroupementMotifs}
          />
          <ProtectedRoute
            exact
            path="/produits/maintenance-prerequis/statuts"
            component={Statut}
          />
          <ProtectedRoute
            exact
            path="/produits/maintenance-prerequis/motifs"
            component={Motif}
          />
          <ProtectedRoute exact path="/reporting" component={Reporting} />

          <ProtectedRoute
            exact
            path="/produits/services"
            component={TypeService}
          />
          <ProtectedRoute
            exact
            path="/produits/services/type-service"
            component={TypeService}
          />
          <ProtectedRoute
            exact
            path="/produits/services/maintenance-services"
            component={Service}
          />
          <ProtectedRoute
            exact
            path="/produits/services/categorie-service"
            component={CategorieService}
          />
          <ProtectedRoute
            exact
            path="/produits/monetique/themes"
            component={Theme}
          />
          <ProtectedRoute
            exact
            path="/produits/monetique/cartes"
            component={Carte}
          />
          <ProtectedRoute exact path="/produits/monetique" component={Theme} />

          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
