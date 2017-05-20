import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import Cell from './results';


var Blank = React.createClass({
    getInitialState: function() {
            const loggedId = JSON.parse(localStorage.getItem("user")).id;
            return {loggedId: loggedId};
    },

    render: function() {
        console.log(this.props.users);
        let res;
        if(this.props.users.length > 0) res = this.props.users.map((user) => {return (<Cell user={user}/>)})
        else res = <Jumbotron><h3>Not Found</h3></Jumbotron>
        return <div key = 'search' className="search-page">{res}</div>
    }
});


export default Blank;
