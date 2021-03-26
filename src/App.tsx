import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';

import { GlobalStyle } from 'styles/global';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
};

export default App;
