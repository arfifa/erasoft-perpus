import React, { Component } from 'react'
import { Collapse, Navbar as NB, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from 'reactstrap';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  toggleNavbar = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    const { collapsed } = this.state
    return (
      <NB color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/" className="mr-3">Erasoft Library</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <Link to="/" className="nav-link">Book</Link>
              </NavItem>
              <NavItem>
                <Link to="/Member" className="nav-link">Member</Link>
              </NavItem>
              <NavItem>
                <Link to="/Borrowed" className="nav-link">borrowing</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </NB>
    )
  }
}

export default Navbar
