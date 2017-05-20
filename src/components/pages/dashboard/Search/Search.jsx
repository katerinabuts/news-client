import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import {UsersService} from '../../../../services/user'
import Cell from './common'
const moment = require('moment');
const Result = require('./common');

var Blank = React.createClass({
    componentWillMount: function() {
     this.setState({users: []});
},
    onSearch: function(event) {
        UsersService.search(event.target.value)
        .then(users => {
            console.log(users);
            return UsersService.following()
            .then(following => {
                let mappedUsers = users.map(user => {
                    if (following.some(follow => follow.id === user.id)) {
                        user.isFollow = true;
                    }
                    else {
                        user.isFollow = false;
                    }
                    return user;
                });
                this.data = {};
                this.setState({users: mappedUsers});
                this.loggedId = JSON.parse(localStorage.getItem("user")).id;
                this.forceUpdate();
            })

        })
        console.log("search")
    },

  render: function() {
      return(
          <div className="container">
              <div className="row">
                  <div className="col-sm-4 col-sm-offset-4">
                      <input type="text" className="form-control" onChange={this.onSearch} placeholder="Search" />
                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <Result users = {this.state.users}/>
              </div>
          </div>
      )
  }

});

export default Blank;
