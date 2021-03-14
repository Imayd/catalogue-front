import React,{useState} from "react";
import {connect} from 'react-redux';
import { Navbar,Nav, NavLink } from 'react-bootstrap';
import { LogOutAction } from "../../redux/auth/authAction";
const { Link, useHistory } = require("react-router-dom");

function NavBar(props){

    const {auth, logout} = props;
    const history = useHistory();
    const [userState, setUserState] = useState({});
    return(
    <div class="container">
        <Navbar bg="dark" dark fixed="top">
        <Nav className="mr-auto">
            <NavLink href="/home">
                <img className="navbar-brand" src='/img/logo3.png' alt="logo" width= "200px" height= "50px" />
            </NavLink>
    
            <div className="navbar-nav mr-auto">
            <div className="ml-auto">
                {
                    !auth.isLoggedIn ? (
                    <div className="nav-item">
                     <Link to={"/login"}>
                        <button className="btn btn-primary btn-sm mx-2">Login</button>
                     </Link>
                    </div> ):
                    (
                    <React.Fragment >
                        <div className="nav-item">
                            <h5>
                                {auth.user.name}
                            </h5>
                        </div>
                        <NavLink>
                                <a href="/login" className="nav-link" onClick={()=>logout(history)}>
                                LogOut
                                </a>
                        </NavLink>
                    </React.Fragment>
                    )
                }
            </div>
            </div>
            </Nav>
        </Navbar>
    </div>
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