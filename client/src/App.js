import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
// import Navigation from './components/Nav';
import MenuAppBar from './components/nav2';
import HomePage from './pages/homePage';
import EventDetailsPage from './pages/eventDetailPage';
// import User from './pages/users';
// import otherUsersProfile from './pages/otherUsersProfile';
import UserProfile from './pages/userProfile';
// import UserEvents from './pages/userEvents';
import CreateEvent from './pages/createEvent';
import EditEvent from './pages/editEvent';
import FooterComponent from './components/footer';

function App() {
  return (
    <Router>
      <div>
        {/* <Navigation /> */}
        <MenuAppBar />

        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/events' component={HomePage}></Route>
          <Route exact path='/events/:id' component={EventDetailsPage}></Route>
          <Route exact path='/create-event' component={CreateEvent}></Route>
          <Route exact path='/events/:id/edit' component={EditEvent}></Route>

          {/* TODO: Change route for /users/ */}
          <Route exact path='/users' component={NoMatch}></Route>

          <Route exact path='/users/:id' component={UserProfile}></Route>

          <Route component={NoMatch} />
        </Switch>

        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;

