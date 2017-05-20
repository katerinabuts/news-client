import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import {NewsService} from '../../../../../services/news'
const moment = require('moment');

var Blank = React.createClass({
    getInitialState: function() {
            const loggedId = JSON.parse(localStorage.getItem("user")).id;
            return {loggedId: loggedId, isReposted: this.props.isReposted, isDeleted: false};
    },

    onRepost: function () {
            console.log(this.state.isReposted)
            if(this.state.isReposted) {
                NewsService.removeRepost(this.props.news.id)
                .then(() => {
                    this.setState({isReposted: false})
                });
            }
            else {
                NewsService.repost(this.props.news.id)
                .then(() => {
                    this.setState({isReposted: true})
                });
            }
    },

    onDelete: function () {
            if(this.props.isRepost) {
                NewsService.removeRepost(this.props.news.id)
                .then(() => {
                    this.setState({isDeleted: true})
                });
            }
            else {
                NewsService.remove(this.props.news.id)
                .then(() => {
                    this.setState({isDeleted: true})
                });
            }
    },

    onEdit: function () {
                window.location.href = `/#/dashboard/create/${this.props.news.id}`;
    },

    render: function() {
            if (!this.state.isDeleted) {
                console.log(this.state.loggedId);
                console.log(this.props.user.id);
                console.log(this.state.loggedId != this.props.user.id);
                return (
                    <Jumbotron>
                        {(this.props.isRepost) ?
                            <h5><Link to={`/dashboard/profile/${this.props.user.id}`}>{this.props.user.name}</Link> reposted the news from <Link to={`/dashboard/profile/${this.props.owner.id}`}>{this.props.owner.name}</Link></h5>
                            :
                            <h5><Link to={`/dashboard/profile/${this.props.user.id}`}>{this.props.user.name}</Link> posted the news</h5>
                        }
                            <h3>{this.props.news.title}</h3>
                        <br />
                        {this.props.news.description}
                            <br /><br />

                            <small>{(moment(this.props.created_at)).format("LLLL")}</small>

                            <br /><br /> <br />
                        <div className="btn-group">
                            {(this.props.user.id == this.state.loggedId && !this.props.isReposted) ?
                                <p><a onClick={this.onEdit} className="btn btn-warning btn-sm btn-outline btn-rounded"> Edit </a></p>
                                :null}
                            {(this.state.loggedId != this.props.user.id) ?
                                <p><a onClick={this.onRepost} className="btn btn-primary btn-sm btn-outline btn-rounded">  {(this.state.isReposted) ? "Reposted" : "Repost" } </a></p> : null}
                            {(this.props.user.id == this.state.loggedId) ?
                                <p><a onClick={this.onDelete} className="btn btn-danger btn-sm btn-outline btn-rounded"> Delete </a></p>
                                :null}
                        </div>

                    </Jumbotron>
                );
            }
            else {
                    return null;
            }

    }

});

export default Blank;
