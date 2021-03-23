import axios from "axios";
import {MarketActionType} from './types'
import authHeader from '../../../helpers/authHeader';

const GetMarketsAction = () => {
    return async (dispatch) => {
        try {
            console.log("inside GetMarketsAction");
            const resp = await axios.get('/markets/', { headers: authHeader()}) ;
            console.log(resp);
            dispatch({
                type : MarketActionType.GET_MARKETS,
                payload : resp.data
            })
          
        } catch (error) {
         console.log(error);
        }
    }
}

export {GetMarketsAction};