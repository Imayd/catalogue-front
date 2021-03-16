import React,{useState} from "react";
import {connect} from 'react-redux';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Navbar, NavLink } from 'react-bootstrap';
import { LogOutAction } from "../../redux/auth/authAction";
const { Link, useHistory } = require("react-router-dom");


function NavBar(props){

    const {auth, logout} = props;
    const history = useHistory();
    const [hover, setHover] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);


    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    return(
    <div class="container">
        <div class="container">
            <Navbar bg="dark" dark fixed="top" className="size">
                <NavLink to="/home">
                    <img className="navbar-brand logo" src='/img/logo3.png' alt="logo"  />
                </NavLink>
    
                {
                    !auth.isLoggedIn ? (
                <li className="logout" >
                    <div className="nav-item">
                     <Link to={"/login"}>
                        <button className="btn btn-primary btn-sm mx-2">Login</button>
                     </Link>
                    </div> 
                </li>):
                    (
                        <React.Fragment>
                        <li className="logout" >
                        <Button
                        color="secondary"
                        variant="contained"
                        onMouseOver={handleOpenMenu}
                        aria-controls='menu'
                        style={{fontWeight:'bold', fontSize:'11px'}}
                        >
                            User Profile
                        </Button>
                        </li>
                        <PowerSettingsNewRoundedIcon 
                        color={hover ? "default" : "secondary"} fontSize="large" 
                        style={{marginLeft :'30px'}} 
                        onClick={()=>{
                            logout(history);
                        }}
                        onMouseEnter={()=>setHover(true)}
                        onMouseLeave={()=>setHover(false)}/>

                    </React.Fragment>
                    )
                }
            </Navbar>
            <Menu 
            id="menu" 
            onClose={handleCloseMenu} 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)}
            style={{marginTop :'40px'}} 
            >
                <MenuItem onClick={handleCloseMenu}>
                    Signed In as<strong>&nbsp; {auth.user.name}</strong>
                </MenuItem>
            </Menu>
        </div>
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