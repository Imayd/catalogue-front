import axios from "axios";
import MarketActionType from './types'

const GetMarketsAction = () => {
    return async (dispatch) => {
        try {
            const resp = await axios.get('/markets/') ;
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