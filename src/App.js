/**
 * Manages the app's diferent states
 */

import React from 'react'
import HomeContainer from './pages/Home/homeContainer'
import Error from './pages/error'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    // Diferent routes the app will have
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={HomeContainer}
        />
        <Route
          component={Error}
        />

      </Switch>
    </BrowserRouter>
  )
}

export default App
