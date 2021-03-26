import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Pokemon from 'pages/Pokemon';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/pokemon/:pokemonId" component={Pokemon} />
    </Switch>
  );
};

export default Routes;
