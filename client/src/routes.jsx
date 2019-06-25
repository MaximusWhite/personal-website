import React from 'react';
import {Route} from 'react-router-dom';
import MainPage from './main_page/main_page';
import AboutMe from './about_me/about_me';
import Resume from './resume/resume';
import Portfolio from './portfolio/portfolio';
import Thoughts from './thoughts/thoughts';
import Bits from './bits/bits';

const routes = (
  <div>
    <Route exact path="/" component={MainPage} />
    <Route path="/about_me" component={AboutMe} />
    <Route path="/resume" component={Resume} />
    <Route path="/portfolio" component={Portfolio} />
    <Route path="/thoughts" component={Thoughts} />
    <Route path="/bits" component={Bits} />
  </div>
);

export default routes;