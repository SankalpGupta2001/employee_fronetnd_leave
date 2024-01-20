
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import '../App.css';

const OffCanvasExample = ({ isAdmin, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userName');

    window.location.href = '/login';
  };

  const employeeID = localStorage.getItem('user');
  console.log(employeeID,"emeemmmemem");

  const dynamicOptions = [
    { name: 'Profile', action: () => window.location.href = `/employeeupdate/${employeeID}}`},
    { name: 'Home', action: () =>     window.location.href = '/home'
},
    { name: 'Pending Requests', action: () =>     window.location.href = '/pending'
},
    { name: 'Submit Request', action: () =>     window.location.href = '/leaveform'
},
    ...(isAdmin
      ? [
          { name: 'Employee List', action: () =>     window.location.href = '/employee'
        },
          { name: 'Leave Approval', action: () =>     window.location.href = '/leave-request'
        },
        ]
      : []),

      { name: 'Logout', action: handleLogout },

  ];
  const userName = isAdmin === 'true' ? 'Admin' :     localStorage.getItem('userName'); 


  return (
    <>
      <Button variant="grey" style={{backgroundColor:"white"}} onClick={toggleShow} className="me-2">
        <ArticleIcon />
      </Button>
      <Offcanvas
  show={show}
  onHide={handleClose}
  backdrop={true}
  scroll={true}
  
  {...props}
>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
  <div
    style={{
      width: '100px',
      height: '100px',
      backgroundColor: 'lightblue',
      borderRadius: '50%',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <PersonIcon style={{ width: '80%', height: '80%', color: 'white' }} />
  </div>
  <div style={{ marginTop: '10px', fontWeight: 'bold' }}>{userName}</div>
</div>

          {dynamicOptions.map((option, idx) => (
            <Button key={idx} variant="primary" className="mb-2" onClick={option.action} style={{ width: '100%' }}>
              {option.name}
            </Button>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

const NavBar = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const toggleAdminMenu = () => {
    setShowAdminMenu((prev) => !prev);
  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home" color="white">Leave Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            {<OffCanvasExample isAdmin={isAdmin} />}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;