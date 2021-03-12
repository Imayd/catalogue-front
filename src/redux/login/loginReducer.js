//import { LoginAction } from "./loginAction"
import {LoginActionType} from './loginAction'


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

const loginReducer = (state = initialState, action)=> {

    console.log("state username"+ state.username);
    console.log("state password"+ state.password);
    console.log("state pasword"+ state.password);


    switch(action.type){
        
        case LoginActionType.LOGIN_SUCCESS : return {
            isLoggedIn : true,
            user : action.payload
        }
        case LoginActionType.LOGIN_FAIL : return { state }

        default : return state;
    }
}

export default loginReducer;