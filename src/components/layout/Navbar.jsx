import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar as BootstrapNavbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { logout } from '../../store/actions/authActions';
import { FaUser, FaSignOutAlt, FaCog, FaChartBar, FaUsers, FaComments, FaClipboardList } from 'react-icons/fa';

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    const redirectPath = dispatch(logout());
    navigate(redirectPath);
  };

  const renderAuthLinks = () => {
    if (user && user.role === 'admin') {
      return (
        <>
          <Nav.Link as={Link} to="/"><FaChartBar className="me-2" />Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/customers"><FaUsers className="me-2" />Customers</Nav.Link>
          <Nav.Link as={Link} to="/communications"><FaComments className="me-2" />Communications</Nav.Link>
          <Nav.Link as={Link} to="/contacts"><FaUsers className="me-2" />Contacts</Nav.Link>
          <Nav.Link as={Link} to="/feedback"><FaClipboardList className="me-2" />Feedback</Nav.Link>
          <Nav.Link as={Link} to="/queries"><FaClipboardList className="me-2" />Queries</Nav.Link>
          <Nav.Link as={Link} to="/admin/reports"><FaChartBar className="me-2" />Reports</Nav.Link>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link}><FaCog className="me-2" />Admin</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/admin/users">Manage Users</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    } else if (user && user.role === 'user') {
      return (
        <>
          <Nav.Link as={Link} to="/userdashboard"><FaChartBar className="me-2" />Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/user/contacts"><FaUsers className="me-2" />Contacts</Nav.Link>
          <Nav.Link as={Link} to="/feedback/feedbackForm"><FaClipboardList className="me-2" />Feedback</Nav.Link>
          <Nav.Link as={Link} to="/queries/raiseQuery"><FaClipboardList className="me-2" />Raise Query</Nav.Link>
        </>
      );
    }
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/">CRM App</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && renderAuthLinks()}
          </Nav>
          <Nav>
            {isAuthenticated && user ? (
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link}><FaUser className="me-2" />{user.name}</Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item as={Link} to="/user/profile">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={onLogout}><FaSignOutAlt className="me-2" />Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex flex-column flex-lg-row">
                <Nav.Link as={Link} to="/login" className="btn btn-outline-light me-lg-2 mb-2 mb-lg-0">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="btn btn-light">Register</Nav.Link>
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;