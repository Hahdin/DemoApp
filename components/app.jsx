import React from 'react'
import { Router, Route } from 'react-router-dom'
import { ThemePage, MyNavBar, SvgPage, SunMoonPage, ChartPage, CheckPage  } from './index'
import { history} from '../helpers'
export const App = () =>{
  return (
    <div className="container">
      <Router history={history}>
        <div>
          <MyNavBar />
          <Route exact path="/" component={ThemePage} />
          <Route path="/theme" component={ThemePage} />
          <Route path="/svg" component={SvgPage} />
          <Route path="/sun" component={SunMoonPage} />
          <Route path="/chart" component={ChartPage} />
          <Route path="/check" component={CheckPage} />
        </div>
      </Router>
    </div>
  )
}
export default App