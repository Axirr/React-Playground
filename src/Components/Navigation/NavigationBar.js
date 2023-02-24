import React, {Component} from 'react';
//import classes from './NavigationBar.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class NavigationBar extends Component {
    render() {
        return (
        <div>
            <Navbar bg="success" expand="lg">
            <Container>
              <Navbar.Brand href="/">Scott Sherlock</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {(window.location.pathname === "/" || window.location.pathname === "/home") ? <div></div> : <Nav.Link href="/">Home</Nav.Link>}
                  <NavDropdown title="Projects" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/loveletter">Love Letter vs Computer</NavDropdown.Item>
                    <NavDropdown.Item href="/netshogun">Multiplayer Shogun of Edo</NavDropdown.Item>
                    <NavDropdown.Item href="/netloveletter">Multiplayer Love Letter</NavDropdown.Item>
                    <NavDropdown.Item href="/deepseadiving">Multiplayer Deep Sea Diving (In Progress)</NavDropdown.Item>
                    <NavDropdown.Item href="/rps">Rock Paper Scissors</NavDropdown.Item>
                    <NavDropdown.Item href="/shogun"><b>OLD</b> Shogun of Edo</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Data Visualization">
                    <NavDropdown.Item href="/datavisualizer">*IN PROGRESS* Personal Data Visualizer</NavDropdown.Item>
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