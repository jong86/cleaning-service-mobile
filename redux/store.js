import reducer from './reducer' //Import the reducer

import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
const store = createStore(reducer, devToolsEnhancer({suppressConnectErrors: false}));

export default store