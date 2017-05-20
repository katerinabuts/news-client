import React, { PropTypes, Component } from 'react';
import NProgress from 'nprogress';
import {NewsService} from '../../../../services/news'

module.exports = {
  path: '/dashboard/profile/:id',
  getComponent(location, cb) {
  	NProgress.start();
    require.ensure([], (require) => {
            require('nprogress').done();
            let feedComp = require('./Profile');
            cb(null, feedComp);
        });
  }
};