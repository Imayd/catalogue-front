import axios from 'axios'

const AuthActionType = {
    LOGIN_SUCCESS : 'LOGIN_SUCCESS',
    LOGIN_FAIL : 'LOGIN_FAIL',
    LOGOUT_SUCCESS : 'LOGOUT_SUCCESS',
    LOGOUT_FAIL:'LOGOUT_FAIL'
};


const LoginAction = (userState, history) => {
    return async (dispatch) => {
        try {
          const resp = await axios.post("/auth/signin",userState);
          console.log(resp);
          const {data} = resp;
          dispatch({
              type : AuthActionType.LOGIN_SUCCESS,
              payload : data
          }) 
          history.push("/home");
        } catch (error) {
            console.log(error);
            dispatch({
                type : AuthActionType.LOGIN_FAIL,
                payload : {}
            });
        }
    }
}
const LogOutAction = (history) => {
    
    return async (dispatch) => {
        try {
          dispatch({
              type : AuthActionType.LOGOUT_SUCCESS,
              payload : {}
          }) 
          history.push("/login");
        } catch (error) {
            console.log(error);
            dispatch({
                type : AuthActionType.LOGOUT_FAIL,
                payload : {}
            });
        }
    }
    
}
export {LoginAction, LogOutAction, AuthActionType};