import React,{useState} from "react";
import {connect} from 'react-redux';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Navbar, NavLink,Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { LogOutAction } from "../../redux/auth/authAction";
import './navbar.css';
import '../../App.css';
const { useHistory } = require("react-router-dom");




const Styles = styled.div`
  .navbar { background-color: #222;}
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
  .hover{
    &:hover { color: #e29c32; }
  }
`;



function NavBar(props){

    const {auth, logout} = props;
    const history = useHistory();
    //const [hover, setHover] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);


    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    return(
    
        <>
        <Styles>
        <Navbar expand="lg"  >
            <NavLink to="/home">
                        <img className="navbar-brand logo" src='/img/logo2.png' alt="logo"  />
            </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
    
              <Nav.Item>
              <li>
                            <Button
                            color="secondary"
                            variant="contained"
                            onMouseOver={handleOpenMenu}
                            aria-controls='menu'
                            style={{fontWeight:'bold', fontSize:'13px', backgroundColor:'#222', color:'#fa5215'}}
                            >
                                User Profile
                            </Button>
                            </li>
              </Nav.Item>
    
    
    
              <Nav.Item>
                  <PowerSettingsNewRoundedIcon 
                            color="secondary" fontSize="large" 
                            style={{marginLeft :'30px'}} 
                            onClick={()=>{
                                logout(history);
                            }}
                            className="hover"
                            />
                </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
        <Menu 
        id="menu" 
        onClose={handleCloseMenu} 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)}
        style={{marginTop :'40px'}} 
        >
            <MenuItem onClick={handleCloseMenu}>
                Signed In as <i>&nbsp; {auth.user.name}</i>
            </MenuItem>
        </Menu>
        </>
      );
}

/**
 * 
onMouseEnter={()=>setHover(true)}
onMouseLeave={()=>setHover(false)}
 */




/*
TO ACCESS THE REDUX STATE IN THIS COMPONENT
*/ 
const mapStateToProps = (state) => {
    return {
        auth : state.auth
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