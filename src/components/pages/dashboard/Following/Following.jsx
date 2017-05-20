import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import {UsersService} from '../../../../services/user'
import Cell from './common'
const moment = require('moment');
const Result = require('./common');

var Blank = React.createClass({
    componentWillMount: function() {
     this.isFetch = false;
     this.setState({users: []});
        UsersService.following()
        .then(users => {
            this.data = {};
            this.setState({users: users});
            this.loggedId = JSON.parse(localStorage.getItem("user")).id;
            this.isFetch = true;
            this.forceUpdate();
        })
        console.log("search")
},


  render: function() {
        if(this.isFetch) {
      return(
          <div className="container">
              <div className="row">
                  <div className="col-sm-4 col-sm-offset-4">
                      <h2>List Of your Followers</h2>
                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <Result users = {this.state.users}/>
              </div>
          </div>
      )
    }
     else {
        return <div><img src={require("../../../../common/images/loading.gif")}  style={{width: 60, height:60}} className="img-responsive center-block" /></div>
    }
  }

});

export default Blank;
