import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import { raiseQuery } from '../../store/actions/communicationActions';
import { getCustomers } from '../../store/actions/customerActions';
import { toast } from 'react-toastify';

const RaiseQueryForm = () => {
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customers.customers);
  const [formData, setFormData] = useState({
    customerId: '',
    summary: '',
    content: '',
    priority: 'medium'
  });

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(raiseQuery(formData));
      toast.success('Query raised successfully!');
      setFormData({ customerId: '', summary: '', content: '', priority: 'medium' });
    } catch (error) {
      toast.error('Failed to raise query. Please try again.');
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-primary text-white">Raise a Query</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Form.Control
              as="select"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
            >
              <option value="">Select a customer</option>
              {customers.map(customer => (
                <option key={customer._id} value={customer._id}>{customer.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Raise Query
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RaiseQueryForm;