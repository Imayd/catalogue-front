import {MarketActionType} from '../actions/types';

const initialState = {
    markets : [], 
    error : ''
};

const marketReducer = (state = initialState, action)=> {
    switch(action.type){
        
        case MarketActionType.GET_MARKETS :
            return {
                ...state,
                markets: action.payload,
                error : '',
            };
        default :
            return state;
    }        
}

export default marketReducer;