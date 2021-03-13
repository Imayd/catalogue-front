import React,{useState} from "react";
import {connect} from 'react-redux';
import { LogOutAction } from "../../redux/auth/authAction";
const { Link, useHistory } = require("react-router-dom");

function NavBar(props){

    const {auth, logout} = props;
    const history = useHistory();
    const [userState, setUserState] = useState({});
    return(
        <nav class="navbar navbar-dark bg-dark">
            <Link to="/home">
                <img className="Header-logo" src='/img/logo_dark.png' />
                <img src='/img/logo.png'/>
            </Link>
            <div className="ml-auto">
                {
                    !auth.isLoggedIn ? (
                    <React.Fragment>
                     <Link to="./login">
                        <button className="btn btn-primary btn-sm mx-2">Login</button>
                     </Link>
                    </React.Fragment> ):
                    (
                    <React.Fragment>
                        <h5>
                            {auth.user.name}
                        </h5>
                        <button className="btn btn-primary btn-sm mx-2">Log Out</button>
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={()=>logout(history)}>
                                LogOut
                                </a>
                            </li>
                        </div>
                        <Link>
                        </Link>
                    </React.Fragment>
                    )
                }
            </div>
            
        </nav>
    );
}



/*
TO ACCESS THE REDUX STATE IN THIS COMPONENT
*/ 
const mapStateToProps = (state) => {
    return {
        auth : state
    }
}

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = (dispatch) => {
    return {
        logout : (history) => {
            dispatch(LogOutAction(history));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)