import React, {useState} from 'react'
import {connect} from 'react-redux'
import { useHistory } from 'react-router';
import { LoginAction } from '../redux/auth/authAction';
function Login(props){

    const {user, login} = props;
    const [userState, setUserState] = useState({});
    const history = useHistory();
    return(
        <div>
            <h2>Login form</h2>
            {/**
            need onChange handler!

            value={props.username}
            */}
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log("userState");
                console.log(userState);
                console.log("user");
                console.log(user);
                login(userState,history);


            }}>
            <input type="text" placeholder="Username"  onChange={(event) => {
                const username = event.target.value;
                setUserState({...userState,...{username}})
            }}></input>
            <input type="password" placeholder="Password" value={props.password}
            onChange={(event) => {
                const password = event.target.value;
                setUserState({...userState,...{password}})
            }}></input>

            <button type="submit">Login</button>
            </form>
        </div>
    )
}

/*
TO ACCESS THE REDUX STATE IN THIS COMPONENT
*/ 
const mapStateToProps = (state) => {
    return {
        user : state
    }
}

/*
TO MAP ACTION CREATORS TO PROPS
*/
const mapDispatchToProps = dispatch => {
    return {
        login : (userState,history) => {
           dispatch(LoginAction(userState,history));
           console.log("userState in mapDispatchToProps");
           console.log(userState);
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)