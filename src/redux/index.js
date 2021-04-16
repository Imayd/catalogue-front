import { combineReducers } from "redux";
import errorsReducer from "./market.maintenance/errors/errorsReducer";
import authReducer from "./auth/authReducer";
import marketReducer from "./market.maintenance/reducers/marketReducer";
import typeClientReducer from "./typeClient/typeClientReducer";
import familleProduitsReducer from "./familleProduits/familleProduitsReducer";

export default combineReducers({
  error: errorsReducer,
  auth: authReducer,
  market: marketReducer,
  typeClient: typeClientReducer,
  familleProduits: familleProduitsReducer,
});
