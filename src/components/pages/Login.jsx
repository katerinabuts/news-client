import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import { History } from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jquery";
import {User} from '../../models/user';
import {UsersService} from '../../services/user'

var LoginPage = React.createClass({
  componentWillMount() {
    if (localStorage.getItem('user') && localStorage.getItem('auth')) {
      window.location.href = '/#/dashboard/overview'
    }
  },

  getInitialState: function(){
    return {
      user: new User({}),
      userSignUp: new User({}),
      loginID: '',
      password: '',
      isSubmitted: false
    };
  },

  mixins: [History],

  render: function(){
  
    return(
        <div className="login-page ng-scope ui-view"> 
          <div className="row"> 
            <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4"> 
              <img src={require("../../common/images/flat-avatar.png")} className="user-avatar" /> 
              <h1>Begin to post your news</h1>
              <br/>
              <h2>LOGIN</h2>
              <form role="form" onSubmit={this.handleLogin} className="ng-pristine ng-valid"> 
                <div className="form-content"> 
                  <div className="form-group"> 
                    <input type="text" className="form-control input-underline input-lg" placeholder="Email" onChange={this.changeLogin}/>
                  </div> 
                  <div className="form-group"> 
                    <input type="password" className="form-control input-underline input-lg" placeholder="Password" onChange={this.changePass}/>
                  </div> 
                </div> 
                <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Log In</button>
              </form>
              <br/>
              <h1>Or</h1>
              <br/>
              <h2>SIGN UP</h2>
              <form role="form" onSubmit={this.handleSignup} className="ng-pristine ng-valid">
                <div className="form-content">
                  <div className="form-group">
                    <input type="text" className="form-control input-underline input-lg" placeholder="Name" onChange={this.changeNameN}/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control input-underline input-lg" placeholder="Description" onChange={this.changeDescriptionN}/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control input-underline input-lg" placeholder="Email" onChange={this.changeEmailN}/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control input-underline input-lg" placeholder="Password" onChange={this.changePassN}/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control input-underline input-lg" placeholder="Username" onChange={this.changeUsernameN}/>
                  </div>
                </div>
                <button type="submit" className="btn btn-white btn-outline btn-lg btn-rounded">Sign Up</button>
              </form>
            </div> 
          </div> 
        </div>
      
    );
      

  },
  changeLogin: function (event) {
    let user = this.state.user;
    user.email = event.target.value;
      this.setState({
        user: user
      });
  },

  changePass: function (event) {
      let user = this.state.user;
      user.password = event.target.value;
      this.setState({
          user: user
      });
  },

  changeNameN: function (event) {
      let user = this.state.userSignUp;
      user.name = event.target.value;
      this.setState({
          userSignUp: user
      });
  },

  changeDescriptionN: function (event) {
      let user = this.state.userSignUp;
      user.description = event.target.value;
      this.setState({
          userSignUp: user
      });
  },

  changeEmailN: function (event) {
        let user = this.state.userSignUp;
        user.email = event.target.value;
        this.setState({
            userSignUp: user
        });
    },

  changePassN: function (event) {
        let user = this.state.userSignUp;
        user.password = event.target.value;
        this.setState({
            userSignUp: user
        });
  },

  changeUsernameN: function (event) {
        let user = this.state.userSignUp;
        user.username = event.target.value;
        this.setState({
            userSignUp: user
        });
    },

  handleLogin: function(e){

    e.preventDefault();

    UsersService.login(this.state.user)
      .then((res) => {
        let loggedUser = res.user;
        let auth = res.token;
        localStorage.setItem("user", JSON.stringify(new User(loggedUser)));
        localStorage.setItem("auth", auth);
        this.props.history.pushState(null, '/dashboard/overview');
      });

    return false;

  },

  handleSignup: function(e){

    e.preventDefault();

    UsersService.createUser(this.state.userSignUp)
      .then((res) => {
        let loggedUser = res.user;
        let auth = res.token;
        localStorage.setItem("user", JSON.stringify(new User(loggedUser)));
        localStorage.setItem("auth", auth);
        this.props.history.pushState(null, '/dashboard/overview');
      });

    return false;

  }

});

export default LoginPage;