import {MarketActionType} from '../actions/types';

const initialState = {
    markets : [], 
    errors : '',
    success: false
};

const marketReducer = (state = initialState, action)=> {
    switch(action.type){
        
        case MarketActionType.ANNULER_ACTION :
            console.log('inside marketReducer ANNULER_ACTION')
            return {
                ...state,
                errors: ''
            };
        case MarketActionType.GET_MARKETS :
            return {
                ...state,
                markets: action.payload
            };
        
        case MarketActionType.ADD_MARKET_SUCCESS :
            
            console.log('inside marketReducer SUCCESS Add_market' + action.payload);
            return {
                    ...state,
                    success : true,
                    errors : ''
            };
        case MarketActionType.ADD_MARKET_FAILED : 
            console.log('inside marketReducer FAILED Add_market');
            console.log(action.payload);
            return {
                ...state,
                errors : action.payload
            };
        case MarketActionType.UPDATE_MARKET_SUCCESS :
            
            console.log('inside marketReducer SUCCESS Update_market');
            console.log( action.payload);
            return {
                     ...state,
                    errors:'',
                    success : true
            };
        case MarketActionType.UPDATE_MARKET_FAILED :
            
            console.log('inside marketReducer FAILED Update_market');
            console.log( action.payload);

            return {
                ...state,
                errors : action.payload
            };
        case MarketActionType.DELETE_MARKET_SUCCESS : 
            console.log('inside marketReducer SUCCESS delete_market' + action.payload);
            return {
                ...state,
                errors : '',
                success : true
            };
        case MarketActionType.DELETE_MARKET_FAILED :
            
                console.log('inside marketReducer FAILED DELETE_market' + action.payload);
                return {
                    ...state,
                    errors : action.payload
                };
        default :
            return state;
    }        
}

export default marketReducer;