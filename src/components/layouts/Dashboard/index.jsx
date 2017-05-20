import React from "react";
import Router, { Link, RouteHandler } from "react-router";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar} from "react-bootstrap";
import $ from "jquery";
import classNames from "classnames";

var HomePage = React.createClass({



  componentWillMount: function() {
    this.setState({Height: $(window).height()});
  },

  componentDidMount: function() {

  },

  componentWillUnmount: function(){
    $(window).unbind('resize',this.adjustResize);

  },

  getInitialState: function(){
      let loggedUser = localStorage.getItem("user");
      if (loggedUser) {
          loggedUser = JSON.parse(loggedUser);
      }
      else {
          loggedUser = {};
      }
      return {
          loggedUser: loggedUser,
          uiElementsCollapsed: true,
          chartsElementsCollapsed: true,
          multiLevelDropdownCollapsed: true,
          thirdLevelDropdownCollapsed: true,
          samplePagesCollapsed: true
      };
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {

    //console.log(this.context);

    // var name = this.context.router.getCurrentPath();

    const { pathname } = this.props.location;

    var title = <span><a href="http://startreact.com/" title="Start React" rel="home"><img src="http://startreact.com/wp-content/themes/dazzling-child/images/logo.png" alt="Start React" title="Start React" height="35px" />&nbsp;SB Admin React - StartReact.com</a></span>;
    
    return (
        <div className="dashboard-page ui-view"> 
          <div className="container-fluid"> 
            <div className="row"> 
              <div className="col-sm-3 col-md-2 sidebar"> 
                <div className="text-center"> 
                  <h2 className="brand">{this.state.loggedUser.name} <br /><small>{this.state.loggedUser.username}</small></h2>
                    <img src={require("../../../common/images/flat-avatar.png")} className="user-avatar" />
                  <br /> 
                  <div onClick={this.logout} className="btn btn-white btn-outline btn-rounded btn-sm">Logout</div>
                </div> 

                <ul className="nav nav-sidebar">
                  <li>
                    <div className="text-center">
                     <small>{this.state.loggedUser.description}</small>
                    </div>
                  </li>
                  <li>
                     <Link to="/dashboard/feed">Feed</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/following">Following</Link>
                  </li>
                <li>
                    <Link to="/dashboard/search">Find users</Link>
                </li>
                    <li>
                        <Link to="/dashboard/create"><b>Create news</b></Link>
                    </li>
                </ul> 
              </div>

               <ReactCSSTransitionGroup component="div"
                                 transitionName="ng"
                                 transitionEnterTimeout={500}
                                 transitionLeaveTimeout={300}
                >
                  {React.cloneElement(<div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main ng-scope ui-view">{this.props.children}</div> || <div />, { key: pathname })}
                </ReactCSSTransitionGroup>

                
            </div> 
          </div> 
        </div>
    );
  },

  logout: function () {
      localStorage.removeItem("user");
      localStorage.removeItem("auth");
      window.location.href = "#/login";
  },

  statics: {
    fetchData: function(params) {
      }
  }
  
});

export default HomePage;
