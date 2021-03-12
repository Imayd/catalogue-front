import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import loginReducer from './login/loginReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(loginReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;