import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Navigation from './components/Nav';
import HomePage from './pages/homePage';
import User from './pages/users';
import UserProfile from "./pages/userProfile";
import UserEvents from './pages/userEvents';

function App() {
  return (
     <Router>
<div>
  {/* <Navigation /> */}
  <Switch>
    <Route exact path='/' component={HomePage}></Route>
    <Route exact path='/logout' component={HomePage}></Route>
    <Route exact path='/userEvents' component={UserEvents}></Route>
    <Route exact path='/books/:id' component={Detail}></Route>
    <Route exact path='/users/:id' component={User}></Route>
    <Route exact path= '/userProfile/:id' component={UserProfile}></Route>
    <Route component={NoMatch} />
  </Switch>
  
</div>
</Router>

  );
}

export default App;


