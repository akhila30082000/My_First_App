import thunk from 'redux-thunk';
import { appReducer } from '../reducers';
import { createStore, applyMiddleware } from 'redux';

export default createStore(appReducer, applyMiddleware(thunk));
