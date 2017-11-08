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
            Take Picture
          </Navbar.Brand>
          </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
