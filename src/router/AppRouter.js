import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { LoginScreen } from '../Components/auth/LoginScreen';
import { CalendarScreen } from '../Components/calendar/CalendarScreen';

export const AppRouter = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={LoginScreen} />          
            <Route exact path="/" component={CalendarScreen} />

            <Redirect to="/" />          
          </Switch>
        </div>
      </Router>
    </div>
  );
};
