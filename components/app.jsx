import React from 'react'
import { Router, Route } from 'react-router-dom'
import {ThemePage} from './index'
import { MyNavBar } from './index'
import { history} from '../helpers'
export const App = () =>{
  return (
    <div className="container">
      <Router history={history}>
        <div>
          <MyNavBar />
          <Route exact path="/" component={ThemePage} />
          <Route path="/theme" component={ThemePage} />
        </div>
      </Router>
    </div>
  )
}
export default App