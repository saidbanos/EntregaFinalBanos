import { Link, NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Badge from 'react-bootstrap/Badge';

const NavBar = () => {
  const imgFicticium = "/imgFicticium.png";
  const expand = false;


  return (
    <>
      <header>

        

        <Navbar  
        
        sticky="top"  key={expand} collapseOnSelect  expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">           <Link to="/">
            <img className="imgFicticium" src={imgFicticium} alt="" />
          </Link>
          </Navbar.Brand>

          <Nav className="me-auto">

          <Navbar.Toggle  aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Categories
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
        
                  <NavLink to="/category/1"  > Arduino Modules </NavLink>

                <br/>
                  <NavLink to="/category/2" > Shield Modules </NavLink>
           
                </Nav>
    
              </Offcanvas.Body>
            </Navbar.Offcanvas>


          </Nav>




        

            <CartWidget/>





          </Container>
        </Navbar>


        <Link to="/">
            <img className="banner" src={"/fic-banner-large.jpg"}  />
          </Link>

      </header>







      










    </>
  )
}

export default NavBar











