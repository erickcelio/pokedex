import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'pages/Home';
import PokemonPage from 'pages/Pokemon';
import NotFoundPage from 'pages/NotFound';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/pokemon/:pokemonId" component={PokemonPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
