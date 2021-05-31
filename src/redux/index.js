import { combineReducers } from "redux";
import errorsReducer from "./market.maintenance/errors/errorsReducer";
import authReducer from "./auth/authReducer";
import marketReducer from "./market.maintenance/reducers/marketReducer";
import typeClientReducer from "./typeClient/typeClientReducer";
import familleProduitsReducer from "./familleProduits/familleProduitsReducer";
import bilanReducer from "./bilan/bilanReducer";
import themeReducer from "./theme/themeReducer";
import typeServiceReducer from "./typeService/typeServiceReducer";
import categorieServiceReducer from "./categorieService/categorieServiceReducer";
import serviceFacturableReducer from "./serviceFacturable/serviceFacturableReducer";
import grpStatutsReducer from "./grpStatuts/grpStatutsReducer";
import grpMotifsReducer from "./grpMotifs/grpMotifsReducer";
import StatutReducer from "./statut/statutReducer";
import MotifReducer from "./motif/motifReducer";

export default combineReducers({
  error: errorsReducer,
  auth: authReducer,
  market: marketReducer,
  typeClient: typeClientReducer,
  familleProduits: familleProduitsReducer,
  bilan: bilanReducer,
  theme: themeReducer,
  typeService: typeServiceReducer,
  categorieService: categorieServiceReducer,
  serviceFacturable: serviceFacturableReducer,
  grpStatuts: grpStatutsReducer,
  grpMotifs: grpMotifsReducer,
  statut: StatutReducer,
  motif: MotifReducer,
});
