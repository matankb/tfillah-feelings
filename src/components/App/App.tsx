import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Data from 'src/components/Data/Data';
import Home from 'src/components/Home/Home';
import MyFeelings from 'src/components/MyFeelings/MyFeelings';
import CheckIn from 'src/components/CheckIn/CheckIn';
import Siddur from 'src/components/Siddur/Siddur';
import Header from 'src/components/Header/Header';

import './app.module.css';

const App = () => (
  <div>
    <Header />

    <Switch>
      <Route path="/check-in"><CheckIn /></Route>
      <Route path="/siddur"><Siddur /></Route>
      <Route path="/my-feelings"><MyFeelings /></Route>
      <Route path="/data"><Data /></Route>
      <Route path="/"><Home /></Route>
    </Switch>
  </div>
)

export default App;
