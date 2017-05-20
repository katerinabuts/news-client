import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import {NewsService} from '../../../../services/news'
import {UsersService} from '../../../../services/user'
import Cell from './common'
import UserCell from './common/user'
const moment = require('moment');

var Blank = React.createClass({
componentDidMount: function() {
   // this.isFetch = false;
    NewsService.fetchOtherFeed()
    .then(feed => {
        UsersService.getUser(this.props.params.id)
            .then((user) => {
                return UsersService.following()
                .then(following => {

                    if (following.some(follow => follow.id === user.id)) {
                        user.isFollow = true;
                    }
                    else {
                        user.isFollow = false;
                    }


                    this.data = {};
                    this.data.feed = feed;
                    this.data.user = user;
                    this.isFetch = true;
                    this.loggedId = JSON.parse(localStorage.getItem("user")).id;
                    this.forceUpdate();
                })
        })
    })

},

  render: function() {
      if(this.isFetch) {
          console.log(this.data.feed)
          console.log(this.data.user)
          this.data.feed = this.data.feed.filter(news => news.user_id == this.data.user.id);
          const feed = this.data.feed.map((feedItem => {
              if (feedItem.isRepost)
                  return(

                          <Cell isReposted = {feedItem.isReposted} isRepost={feedItem.isRepost} user={feedItem.user} owner={feedItem.news.user} news = {feedItem.news} created_at = {feedItem.created_at}/>


                                        )
              else
                  return(
                      <Cell isReposted = {feedItem.isReposted} isRepost={feedItem.isRepost} user={feedItem.user}  news = {feedItem} created_at = {feedItem.created_at}/>

                  )
          }));
        return <div key = 'feed' className="feed-page">
            {(this.data.user.id != this.loggedId) ?
            <UserCell user = {this.data.user}/>
            : " "}


            {feed}</div>;
      }
      else {
          return <div><img src={require("../../../../common/images/loading.gif")}  style={{width: 60, height:60}} className="img-responsive center-block" /></div>
      }
  }

});

export default Blank;
