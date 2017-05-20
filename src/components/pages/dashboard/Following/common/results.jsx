import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import {FollowsService} from '../../../../../services/follow'
const moment = require('moment');

var Blank = React.createClass({
    componentWillMount: function() {
        this.setState({isFollowed: true});
    },

    onFollow: function() {
        FollowsService.follow(this.props.user.id)
        .then((res) => {
            this.setState({isFollowed:true});
        })
    },
    onUnFollow: function() {
        FollowsService.unFollow(this.props.user.id)
        .then((res) => {
            this.setState({isFollowed:false});
        })
    },


    render: function() {
        return (
            <Jumbotron>
                <div className="container">
                    <div className="col-md-10">
                        <h3><Link to={`/dashboard/profile/${this.props.user.id}`}>{this.props.user.name}</Link></h3>
                        <h5>@{this.props.user.username}</h5>
                        <br/>
                        <small>{this.props.user.description}</small>
                    </div>
                    <div className="col-md-2">
                        <br/>
                        {(!this.state.isFollowed) ?
                            <a className="btn btn-success" onClick={this.onFollow}>Follow</a> :
                            < a className="btn btn-warning" onClick={this.onUnFollow}>Unfollow</a>
                        }
                    </div>
                </div>
            </Jumbotron>
        );
    }
});

export default Blank;
