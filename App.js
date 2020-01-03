import React from 'react';
import { Provider} from 'react-redux'; // this is the wrapper

import RootNavigator from './RootNavigator';

//import store from './Store';

const App = () => {
  return (
      <RootNavigator />
  );
};


export default App;
