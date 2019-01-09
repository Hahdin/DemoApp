import React from "react"
import {
  Navbar,
  Nav,
  NavItem,
} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
export const MyNavBar = ({ ...props }) => {
  return (
    <Navbar inverse fluid fixedTop collapseOnSelect style={{boxShadow: '2px 2px 10px black'}}>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/theme">Home</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav>
          <LinkContainer to="/theme">
            <NavItem eventKey={1} >Dynamic CSS Theme</NavItem>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to="/svg">
            <NavItem eventKey={2} >SVG</NavItem>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to="/sun">
            <NavItem eventKey={3} >Sun / Moon</NavItem>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to="/chart">
            <NavItem eventKey={4} >Chart</NavItem>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to="/css">
            <NavItem eventKey={5} >CSSOM </NavItem>
          </LinkContainer>
        </Nav>
        <Navbar.Text pullRight style={{ fontSize: '12px', marginRight: '10px' }}>
          {'Hi'}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default MyNavBar
