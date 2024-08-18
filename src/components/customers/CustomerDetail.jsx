import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getCustomer } from '../../store/actions/customerActions';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import FollowUpForm from '../feedback/FollowupForm';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTshirt, FaPalette, FaPencilAlt } from 'react-icons/fa';


const CustomerDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const customer = useSelector(state => state.customers.customer);

  useEffect(() => {
    dispatch(getCustomer(id));
  }, [dispatch, id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <Container fluid className="py-5 bg-light">
      <h2 className="mb-4">Customer Details</h2>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <FaUser className="me-2" />Personal Information
            </Card.Header>
            <Card.Body>
              <p><FaUser className="me-2" />Name: {customer.name}</p>
              <p><FaEnvelope className="me-2" />Email: {customer.email}</p>
              <p><FaPhone className="me-2" />Phone: {customer.phone}</p>
              <p><FaMapMarkerAlt className="me-2" />Address: {customer.address}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-success text-white">
              <FaTshirt className="me-2" />Preferences
            </Card.Header>
            <Card.Body>
              <p><FaTshirt className="me-2" />Fabric Types: {customer.preferences.fabricTypes.join(', ')}</p>
              <p><FaPalette className="me-2" />Colors: {customer.preferences.colors.join(', ')}</p>
              <p><FaPencilAlt className="me-2" />Designs: {customer.preferences.designs.join(', ')}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              <FaEnvelope className="me-2" />Send Follow-up Email
            </Card.Header>
            <Card.Body>
              <FollowUpForm customerId={id} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Button variant="primary" className="mt-4" as={Link} to={`/customers/${id}/edit`}>
        <FaPencilAlt className="me-2" />Edit Customer
      </Button>
    </Container>
  );
};

export default CustomerDetail;