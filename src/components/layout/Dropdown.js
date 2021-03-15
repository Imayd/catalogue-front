import React,{useState} from "react";
import { Navbar,Nav, NavLink } from 'react-bootstrap';
import { LogOutAction } from "../../redux/auth/authAction";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';



function Dropdown(props) {

    const {auth} = props;
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const dropdownItems = [
    {
        title : `Signed In as ${auth.user.name}`,
        cName : 'SignedInAs'
    }
    ]
/**
 * className={click ?'dropdown-menu clicked' : 'dropdown-menu'}
 */
    return (
        <>
            <ul onClick={handleClick} >
                {dropdownItems.map((item,index)=>{
                    return (
                        <li key={index}>
                             <div className={item.cName}>
                                {item.title}
                             </div>
                        </li>
                    )
                })}

            </ul>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        auth : state
    }
} 

export default connect(mapStateToProps)(Dropdown);