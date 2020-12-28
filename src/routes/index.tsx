import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import AddCar from '../pages/Car/AddCar';
import EditCar from '../pages/Car/EditCar';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/addCar" component={AddCar} isPrivate />
    <Route path="/editCar/:id" component={EditCar} isPrivate />
  </Switch>
);

export default Routes;
