import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addFollowUpAction } from '../../store/actions/customerActions';
import { toast } from 'react-toastify';
import { FaEnvelope, FaTag, FaPencilAlt } from 'react-icons/fa';

const FollowUpForm = ({ customerId }) => {
  const [action, setAction] = useState({ type: '', subject: '', content: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFollowUpAction(customerId, action));
    toast.success('Follow-up email sent successfully');
    setAction({ type: '', subject: '', content: '' });
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-info text-white">
        <FaEnvelope className="me-2" />Send Follow-up Email
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><FaTag className="me-2" />Action Type</Form.Label>
            <Form.Control as="select" value={action.type} onChange={(e) => setAction({...action, type: e.target.value})}>
              <option value="">Select action type</option>
              <option value="fabric_discount">Special Fabric Discount</option>
              <option value="seasonal_promotion">Seasonal Promotion</option>
              <option value="new_collection">New Collection Announcement</option>
              <option value="custom_tailoring">Custom Tailoring Offer</option>
              <option value="loyalty_reward">Loyalty Reward</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><FaPencilAlt className="me-2" />Subject</Form.Label>
            <Form.Control type="text" value={action.subject} onChange={(e) => setAction({...action, subject: e.target.value})} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><FaEnvelope className="me-2" />Email Content</Form.Label>
            <Form.Control as="textarea" rows={4} value={action.content} onChange={(e) => setAction({...action, content: e.target.value})} />
          </Form.Group>
          <Button type="submit" variant="primary">
            <FaEnvelope className="me-2" />Send Follow-up Email
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default FollowUpForm;