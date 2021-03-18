import {AuthActionType} from './authAction'
import {getAuthState} from '../../helpers/jwtLocalStorage'

const initialState={
    isLoggedIn : false,
    user : {
        name :"",
        id: 0,
        username: "",
        email: "",
        roles: [],
        accessToken: "",
        tokenType: ""
    }
    
}

const authState = getAuthState();

const authReducer = (state = initialState, action)=> {

    switch(action.type){
        
        case AuthActionType.LOGIN_SUCCESS : 
            const newAuthState = {
                isLoggedIn : true,
                user : action.payload
            }
            localStorage.setItem("auth",JSON.stringify(newAuthState));
            return newAuthState;

        case AuthActionType.LOGIN_FAIL : return { state }

        case AuthActionType.LOGOUT_SUCCESS : 
            localStorage.removeItem("auth");
            return initialState;

        case AuthActionType.LOGOUT_FAIL : 
            localStorage.removeItem("auth");
            return initialState;

        default : return state;
    }
} 

export default authReducer;

