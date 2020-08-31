import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../Home/Home';
import CheckIn from '../CheckIn/CheckIn';
import Siddur from '../Siddur/Siddur';
import Rating from '../Rating/Rating';
import RateForm from '../Rating/RateForm';
import Data from '../Data/Data';

import style from './app.module.css';

const App = () => (
  <div className={style['app']}>
    <Header />

    <Switch>
      <Route path="/check-in"><CheckIn /></Route>
      <Route path="/siddur"><Siddur /></Route>
      <Route path="/rate" exact><Rating /></Route>
      <Route path="/rate/form"><RateForm /></Route>
      <Route path="/data"><Data /></Route>
      <Route path="/"><Home /></Route>
    </Switch>

  </div>
)

export default App;
