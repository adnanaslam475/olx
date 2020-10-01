import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './reducers/authReducer'
import mapReducer from './reducers/mapReducer';
import adsReducer from './reducers/adReducer';

const middleware = [thunk]
const rootReducer = combineReducers({
  auth: authReducer,
  map: mapReducer,
  ads: adsReducer
})

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(app, document.getElementById('root'))