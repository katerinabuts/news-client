import React from "react";
import { Router, Route, DefaultRoute, RouteHandler, Redirect } from "react-router";

import BaseLayout from "../components/layouts/Base";
import DashboardLayout from "../components/layouts/Dashboard";

import DashboardOverviewPage from "../components/pages/dashboard/Overview";
import DashboardReportsPage from "../components/pages/dashboard/Reports";
import DashboardFeedPage from "../components/pages/dashboard/Feed/Feed";
import DashboardSearchPage from "../components/pages/dashboard/Search/Search";
import DashboardCreatePage from "../components/pages/dashboard/Create/Create";
import DashboardProfilePage from "../components/pages/dashboard/Profile/Profile";
import DashboardFollowingPage from "../components/pages/dashboard/Following/Following";
import LoginPage from "../components/pages/Login";

var Routes = React.createClass({

  statics: {
    getRoutes: function() {
      return (
          <Route name="base" path="/" handler={BaseLayout}>
            <Route name="dashboard" path="/dashboard" handler={DashboardLayout}>
              <Route name="dashboard.profile" path="/profile/:id" component={DashboardProfilePage} />
              <Route name="dashboard.search" path="/search" component={DashboardSearchPage} />
              <Route name="dashboard.following" path="/following" component={DashboardFollowingPage} />
              <Route name="dashboard.create" path="/create(/:id)" component={DashboardCreatePage} />
              <Route name="dashboard.feed" path="/feed" component={DashboardFeedPage} />
              <Route name="dashboard.overview" path="/overview" handler={DashboardOverviewPage} />
              <Route name="dashboard.reports" path="/reports" handler={DashboardReportsPage} />
              <DefaultRoute name="dashboard.default" handler={DashboardOverviewPage} />
            </Route>
            <Route name="login" path="/login" handler={LoginPage} />
            <DefaultRoute name="default" handler={DashboardLayout} />
            <Redirect from="/" to="dashboard.overview" />
          </Route>
      );
    }
  },
  render: function() {
  
  }
  
});

export default Routes;