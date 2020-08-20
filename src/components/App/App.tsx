import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'src/components/Header/Header';
import Home from 'src/components/Home/Home';
import CheckIn from 'src/components/CheckIn/CheckIn';
import Siddur from 'src/components/Siddur/Siddur';
import Data from 'src/components/Data/Data';

import './app.module.css';

const App = () => (
  <div>
    <Header />

    <Switch>
      <Route path="/check-in"><CheckIn /></Route>
      <Route path="/siddur"><Siddur /></Route>
      <Route path="/data"><Data /></Route>
      <Route path="/"><Home /></Route>
    </Switch>

  </div>
)

export default App;
