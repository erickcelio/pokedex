import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';

import MainLayout from 'layouts/Main';
import { GlobalStyle } from 'styles/global';
import { PokemonsProvider } from 'hooks/use-pokemons';
import { PokemonProvider } from 'hooks/use-pokemon';

const App = () => {
  return (
    <BrowserRouter>
      <PokemonsProvider>
        <PokemonProvider>
          <MainLayout>
            <GlobalStyle />
            <Routes />
          </MainLayout>
        </PokemonProvider>
      </PokemonsProvider>
    </BrowserRouter>
  );
};

export default App;
