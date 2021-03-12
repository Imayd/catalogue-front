import axios from 'axios'

const LoginActionType = {
    LOGIN_SUCCESS : 'LOGIN_SUCCESS',
    LOGIN_FAIL : 'LOGIN_FAIL'
};


const LoginAction = (userState) => {
    return async (dispatch) => {
        try {
          const resp = await axios.post("/auth/signin",userState);
          console.log(resp);
          const {data} = resp;
          dispatch({
              type : LoginActionType.LOGIN_SUCCESS,
              payload : data
          }) 
            
        } catch (error) {
            console.log(error);
            dispatch({
                type : LoginActionType.LOGIN_FAIL,
                payload : {}
            });
        }
    }
}
export {LoginAction, LoginActionType};