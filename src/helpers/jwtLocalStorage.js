import axios from "axios";

export const getAuthState = ()=>{
        const auth = localStorage.getItem("auth");
        try {
           const authObj = JSON.parse(auth);
           const {jwttoken} = authObj.user;
           axios.defaults.headers.common["Auhorization"] = `Bearer ${jwttoken}`
           return authObj;
            
        } catch (error) {
            console.log(error);
            /**
             * need to return the authState which is the regular state
             */
        }
    }
