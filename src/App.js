//App.js
import React from 'react'
import Home from './pages/home'
import Error from './pages/error'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          component={Error}
        />

      </Switch>
    </BrowserRouter>
  )
}

export default App
