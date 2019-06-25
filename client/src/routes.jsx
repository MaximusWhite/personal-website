import React from 'react';
import {Route} from 'react-router-dom';
import MainPage from './main_page/main_page';
import AboutMe from './about_me/about_me';


const routes = (
  <div>
    <Route exact path="/" component={MainPage} />
    <Route path="/about_me" component={AboutMe} />

  </div>
);

export default routes;