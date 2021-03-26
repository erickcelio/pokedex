import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';

import MainLayout from 'layouts/Main';
import { GlobalStyle } from 'styles/global';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <GlobalStyle />
        <Routes />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
