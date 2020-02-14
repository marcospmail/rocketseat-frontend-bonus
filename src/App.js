import React from 'react';
import { Provider } from 'react-redux';

import GlobalStyle from '~/styles/global';

import store from '~/store';
import Routes from '~/routes';

const App = () => (
  <Provider store={store}>
    <>
      <Routes />
      <GlobalStyle />
    </>
  </Provider>
);

export default App;
