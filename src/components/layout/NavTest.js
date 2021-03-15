import React,{useState} from "react";
import { Navbar,Nav, NavLink } from 'react-bootstrap';
import Dropdown from './Dropdown';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from "@material-ui/core/MenuList";

function NavTest(props){

    const {auth} = props;
    const [dropdown, setDropdown] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);


    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }
    const onMouseEnter = () =>{
        setDropdown(true);
    }

    const onMouseLeave = () =>{
        setDropdown(false);
    }


    return(
    <div class="container">
        <Navbar bg="dark" dark fixed="top" className="size">
            <NavLink href="/home">
                <img className="navbar-brand logo" src='/img/logo3.png' alt="logo"  />
            </NavLink>
            
            <li className="logout" onMouseEnter= {onMouseEnter} onMouseLeave={onMouseLeave}>
            <Button
            
            color="secondary"
            variant="contained"
            onMouseOver={handleOpenMenu}
            aria-controls='menu'
            style={{fontWeight:'bold', fontSize:'11px'}}>
                User Profile
            </Button>
            </li>
            <PowerSettingsNewRoundedIcon color="secondary" fontSize="large" style={{marginLeft :'30px'}} />
            
        </Navbar>

        <Menu 
        id="menu" 
        onClose={handleCloseMenu} 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)}
        style={{marginTop :'40px'}} 
        >
            <MenuItem onClick={handleCloseMenu}>
                Signed In as<strong>&nbsp; Imane Moustati</strong>
            </MenuItem>
        </Menu>

        
    </div>
    );
}

export default NavTest;

/*


<Nav className="mr-auto">
            <NavLink href="/home">
                <img className="navbar-brand" src='/img/logo3.png' alt="logo" width= "200px" height= "50px" />
            </NavLink>
    
            <div className="navbar-nav mr-auto">
            <div className="ml-auto">
                
                    <div className="nav-item">
                     <Link to={"/login"}>
                        <button className="btn btn-primary btn-sm mx-2">Login</button>
                     </Link>
                    </div> 
                    
                    <React.Fragment >
                        <div className="nav-item">
                            <h5>
                                IMANE MOUSTATI
                            </h5>
                            <h5>Administrateur</h5>
                        </div>
                        <NavLink>
                                <a href="/login" className="nav-link" >
                                LogOut
                                </a>
                        </NavLink>
                    </React.Fragment>
                    
                
            </div>
            </div>
            </Nav>
*/