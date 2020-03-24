import React from 'react';

import { Provider } from 'react-redux';

import store from '~/store';
import AppComponet from '~/routes';

const App = () => (
  <Provider store={store}>
    <AppComponet />
  </Provider>
);

export default App;
