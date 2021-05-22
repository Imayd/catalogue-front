import axios from "axios";
import { ThemeActionType } from "./types";
import authHeader from "../../helpers/authHeader";

const GetThemesAction = () => {
  return async (dispatch) => {
    try {
      console.log("inside GetThemesAction");
      const resp = await axios.get("/themes/", {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ThemeActionType.GET_THEMES,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const AddThemeAction = (values) => {
  console.log("inside AddThemeAction");
  return async (dispatch) => {
    try {
      console.log("inside AddThemeAction tryyy");
      const resp = await axios.post("/themes/", values, {
        headers: authHeader(),
      });
      console.log("Api response");
      console.log(resp);
      dispatch({
        type: ThemeActionType.ADD_THEME_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside AddThemeAction ");
      console.log(error);
      dispatch({
        type: ThemeActionType.ADD_THEME_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const UpdateThemeAction = (themeId, theme) => {
  return async (dispatch) => {
    try {
      const resp = await axios.put(`/themes/${themeId}`, theme, {
        headers: authHeader(),
      });
      console.log("resp" + resp.data);
      dispatch({
        type: ThemeActionType.UPDATE_THEME_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside UpdateThemeAction ");
      dispatch({
        type: ThemeActionType.UPDATE_THEME_FAILED,
        payload: error.response.data,
      });
    }
  };
};

const DeleteThemeAction = (id) => {
  console.log("inside DeleteThemeAction");
  console.log("id " + id);
  return async (dispatch) => {
    try {
      console.log("inside try DeleteThemection");
      const resp = await axios.delete(`/themes/${id}`, {
        headers: authHeader(),
      });
      console.log(resp);
      dispatch({
        type: ThemeActionType.DELETE_THEME_SUCCESS,
        payload: resp.data,
      });
    } catch (error) {
      console.log("catched error inside DeleteThemeAction " + error);
      dispatch({
        type: ThemeActionType.DELETE_THEME_FAILED,
        payload: error,
      });
    }
  };
};

const CancelAction = () => {
  return (dispatch) => {
    dispatch({
      type: ThemeActionType.CANCEL_ACTION,
    });
  };
};

export {
  CancelAction,
  DeleteThemeAction,
  UpdateThemeAction,
  AddThemeAction,
  GetThemesAction,
};
