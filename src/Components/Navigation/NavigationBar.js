import React, {Component} from 'react';
//import classes from './NavigationBar.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class NavigationBar extends Component {
    render() {
        return (
        <div>
            <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/home">Lime Co.</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <NavDropdown title="Projects" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/rps">Rock Paper Scissors</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        );
    }
}

export default NavigationBar;