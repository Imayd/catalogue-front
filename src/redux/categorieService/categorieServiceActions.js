import axios from "axios";
import { CategorieServiceActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetCategoriesServiceAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetCategoriesServiceAction");
      const resp = await axios.get("/services/categorie-service/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: CategorieServiceActionType.GET_CATEGORIES_SERVICE,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddCategorieServiceAction = (values) => {
  console.log("inside AddCategorieServiceAction");
  return async (dispatch) => {
    try {
      console.log("inside AddCategorieServiceAction tryyy");
      const resp = await axios.post("/services/categorie-service/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: CategorieServiceActionType.ADD_CATEGORIE_SERVICE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddCategorieClientAction ");
      console.log(error);
      dispatch({
        type: CategorieServiceActionType.ADD_CATEGORIE_SERVICE_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateCategorieServiceAction = (categorieServiceId, categorieService) => {
  console.log("inside UpdateCategorieServiceAction");
  return async (dispatch) => {
    try {
      console.log("inside try UpdateCategorieClientAction");
      const resp = await axios.put(
        `/services/categorie-service/${categorieServiceId}`,
        categorieService,
        {
          headers: authHeader(),
        }
      );
      dispatch({
        type: CategorieServiceActionType.UPDATE_CATEGORIE_SERVICE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateCategorieServiceAction ");
      dispatch({
        type: CategorieServiceActionType.UPDATE_CATEGORIE_SERVICE_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteCategorieServiceAction = (id) => {
  console.log("inside DeleteCategorieServiceAction");
  return async (dispatch) => {
    try {
      console.log("inside try DeleteCategorieServiceAction");
      const resp = await axios.delete(`/services/categorie-service/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: CategorieServiceActionType.DELETE_CATEGORIE_SERVICE_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteCategorieServiceAction " + error);
      dispatch({
        type: CategorieServiceActionType.DELETE_CATEGORIE_SERVICE_FAILED,
        payload: error,
      });
    }
  };
};

const AnnulerAction = () => {
  return (dispatch) => {
    dispatch({
      type: CategorieServiceActionType.ANNULER_ACTION_CS,
    });
  };
};

export {
  AnnulerAction,
  DeleteCategorieServiceAction,
  UpdateCategorieServiceAction,
  AddCategorieServiceAction,
  GetCategoriesServiceAction,
};
