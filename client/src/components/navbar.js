import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './signup';
import LoginForm from './login';

import Auth from '../utils/auth';

const AppNavbar = () => {
  const [showModal, displayModal] = useState(false);

  return (
    <>
      <Navbar className="font-white background-color " expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/' className="app-font-color">
            <p className="font-white font-normal" >Google Books Search</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto font-white'>
              <Nav.Link className="font-white" as={Link} to='/'>
                <p className="font-white">Search Books</p>
              </Nav.Link>

              {Auth.loggedIn() ? (
                <>
                  <Nav.Link className=" font-white"  as={Link} to='/saved'>
                    <p className="font-white">Saved Books</p>
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}><p className="font-white">Logout</p></Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => displayModal(true)}><p className="font-white">Log In/Create Account</p></Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal 
        size='lg'
        show={showModal}
        onHide={() => displayModal(false)}
        aria-labelledby='signup-modal'>
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav className="app-font-color">
                <Nav.Item>
                  <Nav.Link className="app-font-color logButton" eventKey='login'>Log In</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="app-font-color logButton" eventKey='signup'>Create Account</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => displayModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => displayModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
