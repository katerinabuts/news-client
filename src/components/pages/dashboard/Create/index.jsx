import React, { PropTypes, Component } from 'react';
import NProgress from 'nprogress';
import {NewsService} from '../../../../services/news'

module.exports = {
  path: '/dashboard/create(/:id)',
  getComponent(location, cb) {
  	NProgress.start();
    require.ensure([], (require) => {
            require('nprogress').done();
            let feedComp = require('./Create');
            cb(null, feedComp);
        });
  }
};