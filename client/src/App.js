import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Navigation from './components/Nav';
import HomePage from './pages/homePage';
import EventDetailsPage from './pages/eventDetailPage';
import User from './pages/users';
import otherUsersProfile from './pages/otherUsersProfile';
import UserProfile from "./pages/userProfile";
import UserEvents from './pages/userEvents';
import CreateEvent from "./pages/createEvent";
import EditEvent from "./pages/editEvent";
import FooterComponent from './components/footer';
import Map from './pages/mapsTemp';

function App() {
  return (
     <Router>
<div>
  <Navigation />
  <Switch>
    <Route exact path='/' component={HomePage}></Route>
    <Route exact path='/events/:id' component={EventDetailsPage}></Route>
    <Route exact path='/userEvents' component={UserEvents}></Route>
    <Route exact path='/createEvent' component={CreateEvent}></Route>
    <Route exact path='/editEvent/:id' component={EditEvent}></Route>
    <Route exact path='/users/:id' component={User}></Route>
    <Route exact path = '/otherusers/:id' component={otherUsersProfile}></Route>
    <Route exact path= '/userProfile/:id' component={UserProfile}></Route>
    
    {/* Temporary map */}
    <Route exact path= '/tempmap' component={Map}></Route> 

    <Route component={NoMatch} />
  </Switch>
  {/* <FooterComponent /> */}

  
</div>
</Router>

  );
}

export default App;

