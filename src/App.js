import React from 'react';
import { CssBaseline } from '@material-ui/core';
import NavBar from './partials/navBar';
import Footer from './partials/footer';
import PostReview from './components/postReview';
import Restaurant from './components/restaurant';
import RestaurantList from './components/restaurantList';
import Slogan from './components/slogan';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ReviewCardGrid from './components/ReviewCard';

const App = () => {
  return (
    <>
    <Router>
      <CssBaseline />
        <NavBar />
        <Switch>
            <Route exact path={["/", "/restaruantList"]}>
              <Slogan />
              <ReviewCardGrid />
            </Route>
            
            <Route exact path="/restaruant">
              <Restaurant />
            </Route>

            <Route exact path="/postReview">
              <PostReview />
            </Route>
          <Footer />
          </Switch>
    </Router>
    </>
  );
}

export default App;

