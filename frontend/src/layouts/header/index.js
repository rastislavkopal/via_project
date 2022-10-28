import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// import { authRoutes, nonAuthRoutes } from './routes';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import authAtom from '../../_state/auth';

export default function CustomHeader() {
  const auth = useRecoilValue(authAtom);

  const location = useLocation();
  useEffect(() => {
  }, [auth]);

  const navItems = (auth)
    ? (
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/dashboard" active={location.pathname === 'dashboard'}>Dashboard</Nav.Link>
          </Nav>
          <Nav activeKey={location.pathname}>
            <Nav.Link as={Link} to="/logout" active={location.pathname === '/logout'}>logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    ) : (
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
          </Nav>
          <Nav activeKey={location.pathname}>
            <Nav.Link as={Link} active={location.pathname === '/sign-in'} to="/sign-in">Sign In</Nav.Link>
            <Nav.Link as={Link} active={location.pathname === '/sign-up'} to="/sign-up">Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    );

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      {navItems}
    </Navbar>
  );
}
