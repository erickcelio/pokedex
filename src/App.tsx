import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';

import MainLayout from 'layouts/Main';
import { GlobalStyle } from 'styles/global';
import { PokemonsProvider } from 'hooks/use-pokemons';

const App = () => {
  return (
    <BrowserRouter>
      <PokemonsProvider>
        <MainLayout>
          <GlobalStyle />
          <Routes />
        </MainLayout>
      </PokemonsProvider>
    </BrowserRouter>
  );
};

export default App;
