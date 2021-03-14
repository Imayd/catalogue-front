
import { Navbar,Nav, NavLink } from 'react-bootstrap';

function NavTest(){

    return(
    <div class="container">
        <Navbar bg="dark" dark fixed="top" className="size">
            <NavLink href="/home">
                <img className="navbar-brand logo" src='/img/logo3.png' alt="logo"  />
            </NavLink>
            <NavLink className="logout">
                <a href="/login" className="nav-link">
                    LogOut
                </a>
            </NavLink>
        </Navbar>
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