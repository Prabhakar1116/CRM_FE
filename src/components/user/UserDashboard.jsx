import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Container, ListGroup } from 'react-bootstrap';
import { getUserDashboardData } from '../../store/actions/dashboardActions';
import { getUserContacts } from '../../store/actions/contactActions';
import { FaUser, FaAddressBook, FaComments } from 'react-icons/fa';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { recentCommunications } = useSelector(state => state.dashboard);
  const { contacts } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(getUserDashboardData());
    dispatch(getUserContacts());
  }, [dispatch]);

  return (
    <Container fluid className="py-5 bg-light">
      <h2 className="mb-4">Welcome, {user.name}</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <FaUser className="me-2" />User Information
            </Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-success text-white">
              <FaAddressBook className="me-2" />Recent Contacts
            </Card.Header>
            <ListGroup variant="flush">
              {contacts && contacts.length > 0 ? (
                contacts.slice(0, 5).map(contact => (
                  <ListGroup.Item key={contact._id}>
                    {contact.name} - {contact.email}
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No recent contacts</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-info text-white">
              <FaComments className="me-2" />Recent Communications
            </Card.Header>
            <ListGroup variant="flush">
              {recentCommunications && recentCommunications.map(comm => (
                <ListGroup.Item key={comm._id}>
                  {comm.type} with {comm.customerName} on {new Date(comm.date).toLocaleDateString()}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;