import React, {useState} from 'react'
import {connect} from 'react-redux'
import { useHistory } from 'react-router';
import { LoginAction } from '../redux/auth/authAction';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


function Login(props){

    const {login} = props;
    const [userState, setUserState] = useState({});
    const history = useHistory();
    return(
        <div className="col-md-12">
          <div className="card card-container">
            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            />
            <Form
            onSubmit={(event) => {
                event.preventDefault();
                login(userState,history);
            }}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={(event) => {
                        const username = event.target.value;
                        setUserState({...userState,...{username}})
                    }}
                />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                onChange={(event) => {
                    const password = event.target.value;
                    setUserState({...userState,...{password}})
                }}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">
                <span>Login</span>
              </button>
            </div>
            </Form>
          </div>
        </div>
    );
}




/*
TO ACCESS THE REDUX STATE IN THIS COMPONENT
*/ 
const mapStateToProps = (state) => {
    return {
        user : state.auth
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