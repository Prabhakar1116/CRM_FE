import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../../store/actions/contactActions';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';

const ContactForm = ({ contact, customers, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    customerId: ''
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        customerId: contact.customerId ? contact.customerId._id : ''
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contact) {
        await dispatch(updateContact(contact._id, formData));
        toast.success('Contact updated successfully');
      } else {
        await dispatch(addContact(formData));
        toast.success('Contact added successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save contact');
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <FaUser className="me-2" />{contact ? 'Update Contact' : 'Add Contact'}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaUser className="me-2" />Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaPhone className="me-2" />Phone</Form.Label>
                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaBuilding className="me-2" />Customer</Form.Label>
                <Form.Select name="customerId" value={formData.customerId} onChange={handleChange} required>
                  <option value="">Select a customer</option>
                  {customers && customers.length > 0 ? (
                    customers.map(customer => (
                      <option key={customer._id} value={customer._id}>{customer.name}</option>
                    ))
                  ) : (
                    <option value="" disabled>No customers available</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            {contact ? 'Update Contact' : 'Add Contact'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ContactForm;