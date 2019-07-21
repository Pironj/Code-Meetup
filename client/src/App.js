import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Books from './pages/Books';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Navigation from './components/Nav';
import HomePage from './pages/homePage';

function App() {
  return (
     <Router>
<div>
  <Navigation />
  <Switch>
    <Route exact path='/' component={HomePage}></Route>
    <Route exact path='/logout' component={HomePage}></Route>
    <Route exact path='/books' component={Books}></Route>
    <Route exact path='/books/:id' component={Detail}></Route>
    <Route component={NoMatch} />
  </Switch>
</div>
</Router>

  );
}

export default App;


