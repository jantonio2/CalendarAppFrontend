import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch } from 'react-redux';
import { startChecking } from '../actions/auth';

export const AppRouter = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

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
