import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import {NewsService} from '../../../../services/news'
import {News} from '../../../../models/news';
const moment = require('moment');

var Blank = React.createClass({
    componentDidMount: function () {
        this.isFetch = false;
        this.data = {};
        let id = this.props.params.id;
        console.log(id)
        let isUpdate = !!id;
        this.setState({isUpdate: isUpdate});

        if (isUpdate) {
            NewsService.fetchNewsById(id)
            .then(news => {
                this.data = {};
                this.data.news = new News(news);
                this.isFetch = true;
                //this.loggedId = JSON.parse(localStorage.getItem("user")).id;
                this.forceUpdate();
            })
        }
        else {
            this.data.news = new News({});
            this.isFetch = true;
        }


    },

    render: function () {
        if (this.isFetch) {
            return (<div key='create' className="create-page">
                <link rel="stylesheet"
                      href="http://cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.2/css/bootstrapValidator.min.css"/>
                <script type="text/javascript"
                        src="http://cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.2/js/bootstrapValidator.min.js"></script>
                <div className="center-block container">
                    <div className="row">
                        <form role="form" id="contact-form" className="contact-form">
                            <div className="row">
                                <div className="col-md-6 col-md-offset-3">
                                    <div className="form-group">
                                        <input onChange={this.onChangeName} type="text" className="form-control"
                                               name="Title" autoComplete="off" id="Title" placeholder="Title"
                                               defaultValue={this.data.news.title}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-md-offset-3">
                                    <div className="form-group">
                                        <textarea onChange={this.onChangeDescription} className="form-control textarea"
                                                  rows="10" name="Body" id="Body" placeholder="Body of news"
                                                  defaultValue={this.data.news.description}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-md-offset-3" style={{textAlign: "center"}}>
                                    <a onClick={this.onClick} type="submit" className="btn btn-primary"
                                       style={{margin: "auto"}}>Public the news</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>);
        }
        else {
            return <div><img src={require("../../../../common/images/loading.gif")} style={{width: 60, height: 60}}
                             className="img-responsive center-block"/></div>
        }
    },

    onChangeName: function (event) {
        this.data.news.title = event.target.value;
    },
    onChangeDescription: function (event) {
        this.data.news.description = event.target.value;
    },
    onClick: function () {
        if (!this.state.isUpdate)
            NewsService.createNews(this.data.news)
            .then((news) => {
                window.location.href = '/#/dashboard/feed';
            })
            .catch((err) => console.error(err));
        else
            NewsService.updateNews(this.data.news)
            .then((news) => {
                window.location.href = '/#/dashboard/feed';
            })
            .catch((err) => console.error(err));
    }
});

export default Blank;
