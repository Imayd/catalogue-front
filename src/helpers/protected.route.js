import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

const ProtectedRoute = ({
    isLoggedIn,
    component : Component,
    ...rest
})=>(
    <Route {...rest} component={(props) => (
        isLoggedIn ? (
            <Component {...props}/>
        ) : (
            <Redirect to='/'/>
        )
    )}/>
);

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.isLoggedIn
    }
} 
export default connect(mapStateToProps)(ProtectedRoute);
