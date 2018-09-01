import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import App from '../imports/ui/App.jsx';
import New from '../imports/ui/New';
import Lost from '../imports/ui/Lost';
import FileUpload from "../imports/ui/FileUpload";

injectTapEventPlugin();

Meteor.startup(() => {
  render((
    <Router>
      <Switch>
        <Route exact path="/" component={App}/>
          <Route path="/new" component={New}/>
          <Route path="/images" component={FileUpload}/>
        <Route component={Lost}/>
      </Switch>
    </Router>
  ), document.getElementById('render-target'));
});
