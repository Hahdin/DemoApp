import React from 'react'
export class CSSPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    this.setCSS('root', 'color', 'green')
    this.setCSS('root', 'text-shadow', '1px 1px 3px black')
    this.setCSS('root', 'font-family', 'Georgia, serif')
    this.setCSS('root', 'font-size', '1.5em')
    this.test()
  }

  test (prop = 'background') {
    let val = window.getComputedStyle(document.body)
    document.getElementById('root').innerHTML = `document body background is ${val[prop]}`
  }

  setCSS (id, prop, value) {
    let el = document.getElementById(id)
    el.style.setProperty(prop, value)
  }

  handleClick (e) {
    let el = document.getElementById('root')
    let btn = document.getElementById('cssbtn')
    el.style.removeProperty('font-size')
    btn.disabled = true
    btn.style.cursor = 'not-allowed'
    // example: take a look at the rules in the first sheet with rules
    // let myRules = null
    // for (var i = document.styleSheets.length - 1; i >= 0; i--) {
    //   let sheet = document.styleSheets[i]
    //   if (sheet.cssRules) {
    //     myRules = sheet.cssRules
    //     break
    //   }
    // }
    // console.table(myRules)
  }

  render () {
    return (
      <div>
        <div id='root'></div>
        <header>--------------------------------------------------------------------------------------</header>
        <button id='cssbtn' onClick={this.handleClick.bind(this)}>Click to Remove inline Font Size and revert to CSS definition</button>
      </div>
    )
  }
}

export default CSSPage
