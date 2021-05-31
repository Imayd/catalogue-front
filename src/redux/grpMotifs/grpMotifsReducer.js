import { GrpMotifsActionType } from "./types";

const initialState = {
  grpsMotifs: [],
  errors: "",
  success: false,
};

const grpMotifsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GrpMotifsActionType.ANNULER_ACTION_GM:
      console.log("inside GrpMotifsReducer ANNULER_ACTION_GM");
      return {
        ...state,
        errors: "",
      };
    case GrpMotifsActionType.GET_GRPS_MOTIFS:
      return {
        ...state,
        grpsMotifs: action.payload,
      };

    case GrpMotifsActionType.ADD_GRP_MOTIFS_SUCCESS:
      console.log("inside GrpMotifsReducer SUCCESS Add_" + action.payload);
      window.location.reload();
      return {
        ...state,
        success: true,
        errors: "",
      };
    case GrpMotifsActionType.ADD_GRP_MOTIFS_FAILED:
      console.log("inside GrpMotifsReducer FAILED Add_");
      console.log(action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    case GrpMotifsActionType.UPDATE_GRP_MOTIFS_SUCCESS:
      console.log("inside GrpMotifsReducer SUCCESS Update_");
      console.log(action.payload);
      window.location.reload();
      return {
        ...state,
        errors: "",
        success: true,
      };
    case GrpMotifsActionType.UPDATE_GRP_MOTIFS_FAILED:
      console.log("inside GrpMotifsReducer FAILED Update_");
      console.log(action.payload);

      return {
        ...state,
        errors: action.payload,
      };
    case GrpMotifsActionType.DELETE_GRP_MOTIFS_SUCCESS:
      console.log("inside GrpMotifsReducer SUCCESS delete_" + action.payload);
      return {
        ...state,
        errors: "",
        success: true,
      };
    case GrpMotifsActionType.DELETE_GRP_MOTIFS_FAILED:
      console.log("inside GrpMotifsReducer FAILED DELETE_" + action.payload);
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default grpMotifsReducer;
