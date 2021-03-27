import axios from "axios";
import {MarketActionType} from './types'
import authHeader from '../../../helpers/authHeader';

//const Authorization = authHeader();

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

const AddMarketAction = (values) => {
    console.log('inside addMarketAction');
    return async (dispatch) => {
        try {
            console.log("inside AddMarketsAction");
            const resp = await axios.post('/markets/',values, { headers: authHeader()}) ;
            console.log('Api response');
            console.log(resp);
            dispatch({
                type : MarketActionType.ADD_MARKET_SUCCESS,
                payload : resp.data
            });
            //history.push('/administration');
          
        } catch (error) {
            console.log('catched error inside AddMarketAction ');
            console.log(error);
            dispatch({
                type : MarketActionType.ADD_MARKET_FAILED,
                payload : error.response.data
            })
         
        }
    }
}

const UpdateMarketAction = (marketId,market) => {
    console.log('inside updateMarketAction');
    return async (dispatch) => {
        try {
            console.log("inside try updateMarketsAction");
            const resp = await axios.put(`/markets/${marketId}`,market, { headers: authHeader()}) ;
            dispatch({
                type : MarketActionType.UPDATE_MARKET_SUCCESS,
                payload : resp.data
            });
          
        } catch (error) {
            console.log('catched error inside UpdateMarketAction ');
            dispatch({
                type : MarketActionType.UPDATE_MARKET_FAILED,
                payload : error.response.data
            })
         
        }
    }
}

const DeleteMarketAction = (id) => {

    console.log('inside deleteMarketAction');
    return async (dispatch) => {
        try {
            console.log("inside try deleteMarketsAction");
            const resp = await axios.delete(`/markets/${id}`, { headers: authHeader()}) ;
            console.log(resp);
            dispatch({
                type : MarketActionType.DELETE_MARKET_SUCCESS,
                payload : resp.data
            });
          
        } catch (error) {
            console.log('catched error inside deleteMarketAction '+error);
            dispatch({
                type : MarketActionType.DELETE_MARKET_FAILED,
                payload : error
            })
         
        }
}
}

const AnnulerAction = () => {
    return (dispatch) => {
    dispatch({
        type : MarketActionType.ANNULER_ACTION
    });
    }
}
export {GetMarketsAction,AddMarketAction, UpdateMarketAction, DeleteMarketAction, AnnulerAction};