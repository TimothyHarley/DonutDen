import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { isAuthed, logoutClickEvent } = this.props;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={RRNavLink} to="/">Donut Den</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to="/menu/">Menu</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/order/">Order Now</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/employees/">Employees</NavLink>
              </NavItem>
              <NavItem>
              { isAuthed ? <NavLink className="navLink" onClick={logoutClickEvent} style={{cursor: 'pointer'}}>Logout</NavLink> : ''}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}