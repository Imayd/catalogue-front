import axios from "axios";
import { ReportingActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetNbrMarketsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetNbrMarketsAction");
      const resp = await axios.get("/reporting/nbrMarkets/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_NBR_MARKETS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetNbrCartesAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetNbrCartesAction");
      const resp = await axios.get("/reporting/nbrCartes/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_NBR_CARTES,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetNbrFamillesProduitsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetNbrFamillesProduitsAction");
      const resp = await axios.get("/reporting/nbrFamillesProduits/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_NBR_FAMILLES_PRODUITS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetNbrTypesClientAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetNbrTypesClientAction");
      const resp = await axios.get("/reporting/nbrTypesClient/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_NBR_TYPES_CLIENT,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetThemesAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetThemesAction");
      const resp = await axios.get("/reporting/themes", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_THEMES,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetCategoriesServiceAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetCategoriesServiceAction");
      const resp = await axios.get("/reporting/categoriesService", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_CATEGORIES_SERVICE,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetGrpsStatutsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetGrpsStatutsAction");
      const resp = await axios.get("/reporting/grpsStatuts", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_GRPS_STATUTS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetGrpsMotifsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetGrpsMotifsAction");
      const resp = await axios.get("/reporting/grpsMotifs", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_GRPS_MOTIFS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetNbrCartesParThemeAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetNbrCartesParThemeAction");
      const resp = await axios.get("/reporting/nbrCartesParTheme/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_NBR_CARTES_PAR_THEME,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetNbrServicesParCategorieServiceAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetNbrServicesParCategorieServiceAction");
      const resp = await axios.get(
        "/reporting/nbrServicesParCategorieService/",
        {
          headers: authHeader(),
        }
      );
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_NBR_SERVICES_PAR_CATEGORIE_SERVICE,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetNbrServicesParGrpStatutsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetNbrServicesParGrpStatutsAction");
      const resp = await axios.get("/reporting/nbrServicesParGrpStatuts/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_NBR_SERVICES_PAR_GRP_STATUTS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const GetNbrServicesParGrpMotifsAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetNbrServicesParGrpMotifsAction");
      const resp = await axios.get("/reporting/nbrServicesParGrpMotifs/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ReportingActionType.GET_NBR_SERVICES_PAR_GRP_MOTIFS,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AnnulerAction = () => {
  return (dispatch) => {
    dispatch({
      type: ReportingActionType.ANNULER_ACTION_R,
    });
  };
};

export {
  AnnulerAction,
  GetNbrMarketsAction,
  GetNbrCartesAction,
  GetNbrFamillesProduitsAction,
  GetNbrTypesClientAction,
  GetNbrCartesParThemeAction,
  GetNbrServicesParCategorieServiceAction,
  GetNbrServicesParGrpStatutsAction,
  GetNbrServicesParGrpMotifsAction,
  GetGrpsMotifsAction,
  GetGrpsStatutsAction,
  GetCategoriesServiceAction,
  GetThemesAction
};
