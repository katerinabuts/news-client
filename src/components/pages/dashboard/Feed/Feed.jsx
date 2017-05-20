import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import {NewsService} from '../../../../services/news'
import Cell from './common'
const moment = require('moment');

var Blank = React.createClass({
componentDidMount: function() {
   // this.isFetch = false;
    NewsService.fetchFeed()
    .then(feed => {
        this.data = {};
        this.data.feed = feed;
        this.isFetch= true;
        this.loggedId = JSON.parse(localStorage.getItem("user")).id;
        this.forceUpdate();
    })
},

  render: function() {
      if(this.isFetch) {
          console.log(this.data.feed)

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
        return <div key = 'feed' className="feed-page">{feed}</div>;
      }
      else {
          return <div><img src={require("../../../../common/images/loading.gif")}  style={{width: 60, height:60}} className="img-responsive center-block" /></div>
      }
  }

});

export default Blank;
