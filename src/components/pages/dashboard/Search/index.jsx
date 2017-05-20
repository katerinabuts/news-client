import React, { PropTypes, Component } from 'react';
import NProgress from 'nprogress';
import {NewsService} from '../../../../services/news'

module.exports = {
  path: '/dashboard/search',
  getComponent(location, cb) {
  	NProgress.start();
    require.ensure([], (require) => {
            require('nprogress').done();
            let searchComp = require('./Search');
            cb(null, searchComp);
        });
  }
};