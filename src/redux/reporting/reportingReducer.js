import { ReportingActionType } from "./types";

const initialState = {
  nbrMarkets: 0,
  nbrCartes: 0,
  nbrFamillesProduits: 0,
  nbrTypesClient: 0,
  nbrCartesParTheme: [],
  nbrServicesParCategorieService: [],
  nbrServicesParGrpStatuts: [],
  nbrServicesParGrpMotifs: [],
  themes: [],
  categoriesService: [],
  grpsStatuts: [],
  grpsMotifs: [],
  errors: "",
};

const reportingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ReportingActionType.ANNULER_ACTION_R:
      console.log("inside Reporting ANNULER_ACTION_R");
      return {
        ...state,
        errors: "",
      };
    case ReportingActionType.GET_NBR_MARKETS:
      return {
        ...state,
        nbrMarkets: action.payload,
      };
    case ReportingActionType.GET_NBR_TYPES_CLIENT:
      return {
        ...state,
        nbrTypesClient: action.payload,
      };
    case ReportingActionType.GET_NBR_FAMILLES_PRODUITS:
      return {
        ...state,
        nbrFamillesProduits: action.payload,
      };
    case ReportingActionType.GET_NBR_CARTES:
      return {
        ...state,
        nbrCartes: action.payload,
      };
    case ReportingActionType.GET_THEMES:
      return {
        ...state,
        themes: action.payload,
      };
    case ReportingActionType.GET_CATEGORIES_SERVICE:
      return {
        ...state,
        categoriesService: action.payload,
      };
    case ReportingActionType.GET_GRPS_MOTIFS:
      return {
        ...state,
        grpsMotifs: action.payload,
      };
    case ReportingActionType.GET_GRPS_STATUTS:
      return {
        ...state,
        grpsStatuts: action.payload,
      };
    case ReportingActionType.GET_NBR_CARTES_PAR_THEME:
      return {
        ...state,
        nbrCartesParTheme: action.payload,
      };
    case ReportingActionType.GET_NBR_SERVICES_PAR_CATEGORIE_SERVICE:
      return {
        ...state,
        nbrServicesParCategorieService: action.payload,
      };
    case ReportingActionType.GET_NBR_SERVICES_PAR_GRP_STATUTS:
      return {
        ...state,
        nbrServicesParGrpStatuts: action.payload,
      };
    case ReportingActionType.GET_NBR_SERVICES_PAR_GRP_MOTIFS:
      return {
        ...state,
        nbrServicesParGrpMotifs: action.payload,
      };
    default:
      return state;
  }
};

export default reportingReducer;
