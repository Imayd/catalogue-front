import MarketActionType from '../actions/types';

const initialState = {};

const errorsReducer = (state = initialState, action)=> {
    switch(action.type){
        
        case MarketActionType.GET_ERRORS :
            return action.payload
        default :
            return state;
    }        
}

export default errorsReducer;
