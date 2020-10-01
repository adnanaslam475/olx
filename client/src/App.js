import React from 'react';
import NavBar from './container/container';
import './App.css'
import Get from './container/Get/Get'
import Post from './container/Post/post'
import { Switch, Route } from 'react-router-dom'

function App() {
  let routes = (
    <Switch>
      <Route exact path='/' component={Get} />
      <Route path='/post' component={Post} />
    </Switch>
  )

  return (
    <div >
      <NavBar />
      {routes}
    </div>
  );
}
export default App