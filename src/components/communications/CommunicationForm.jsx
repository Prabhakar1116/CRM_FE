import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommunication, updateCommunication } from '../../store/actions/communicationActions';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaUser, FaComments, FaCalendar, FaFileAlt } from 'react-icons/fa';

const communicationTypes = [
  'email',
  'phone',
  'chat',
  'meeting',
  'video call',
  'social media',
  'query',
  'other'
];

const CommunicationForm = ({ communication, onClose }) => {
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customers.customers);
  const [formData, setFormData] = useState({
    customerId: '',
    type: '',
    date: '',
    summary: ''
  });

  useEffect(() => {
    if (communication) {
      setFormData({
        customerId: communication.customerId ? communication.customerId._id : '',
        type: communication.type,
        date: communication.date.split('T')[0],
        summary: communication.summary
      });
    }
  }, [communication]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (communication) {
      dispatch(updateCommunication(communication._id, formData));
      toast.success('Communication updated successfully');
    } else {
      dispatch(addCommunication(formData));
      toast.success('Communication added successfully');
    }
    onClose();
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <FaComments className="me-2" />{communication ? 'Update Communication' : 'Add Communication'}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaUser className="me-2" />Customer</Form.Label>
                <Form.Select name="customerId" value={formData.customerId} onChange={handleChange} required>
                  <option value="">Select a customer</option>
                  {customers.map(customer => (
                    <option key={customer._id} value={customer._id}>{customer.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaComments className="me-2" />Type</Form.Label>
                <Form.Select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="">Select communication type</option>
                  {communicationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label><FaCalendar className="me-2" />Date</Form.Label>
                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label><FaFileAlt className="me-2" />Summary</Form.Label>
            <Form.Control as="textarea" rows={3} name="summary" value={formData.summary} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            {communication ? 'Update Communication' : 'Add Communication'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CommunicationForm;