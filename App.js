import React from 'react';
import { Provider} from 'react-redux'; // this is the wrapper

import NavigationService from './NavigationService';
import store from './Store';
import RootNavigator from './RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
};


export default App;
