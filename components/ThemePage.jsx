import React from 'react'
import { Button } from "react-bootstrap"
export const ThemePage = () => {
  const toggleTheme = () => {
    document.documentElement.hasAttribute('theme')
      ? document.documentElement.removeAttribute('theme')
      : document.documentElement.setAttribute('theme', 'dark')
  }
  const switchColors = color => {
    color === 'red' ? setColors('var(--red-hue)', 'var(--blue-hue)') :
      color === 'blue' ? setColors('var(--blue-hue)', 'var(--green-hue)') :
        setColors('var(--green-hue)', 'var(--red-hue)')
  }
  const setColors = (main, body) => {
    document.documentElement.style.setProperty('--main-hue', main)
    document.documentElement.style.setProperty('--body-hue', body)
  }
  return (
    <div className='card'>
      <nav className='nav'>
        <a className='mylink' href='#'>A Link</a>
        <a className='mylink' href='#'>Another Link</a>
      </nav>
      <div className='_container'>
        <div>
          <Button bsStyle="danger" onClick={() => switchColors('red')}>Red</Button>{" "}
          <Button bsStyle="success" onClick={() => switchColors('green')}>Green</Button>{" "}
          <Button bsStyle="primary" onClick={() => switchColors('blue')}>Blue</Button>{" "}
          <Button bsStyle="warning" onClick={toggleTheme}>Light/Dark</Button>{" "}
        </div>
        <h2 className='title'>What is Lorem Ipsum?</h2>
        <p className='content'>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
      </div>
      <footer>
        Copyright 2018
      </footer>
    </div >
  )
}
export default ThemePage
