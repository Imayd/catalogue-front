import axios from "axios";

export const getAuthState = ()=>{
        const auth = localStorage.getItem("auth") ? localStorage.getItem("auth") : null ;
        try {
           const authObj = JSON.parse(auth);
           const accessToken = authObj.user.accessToken;
           axios.defaults.headers.common["Auhorization"] = `Bearer ${accessToken}`
           return authObj;
            
        } catch (error) {
            console.log(error);
            /**
             * need to return the authState which is the regular state
             */
        }
    }
