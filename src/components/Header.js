import React, {Component} from 'react';
import {Nav, Navbar, MenuItem, NavItem, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import '../css/styles.css'



class Header extends Component {
  render() {
    return (
      <Navbar className='navbar' inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Take Picture</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>Edit</NavItem>
            <NavItem>Save</NavItem>
            <NavItem>Delete</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
