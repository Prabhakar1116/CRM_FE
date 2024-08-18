import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeedback } from '../../store/actions/feedbackActions';
import { Table, Container, Card, Row, Col } from 'react-bootstrap';
import { FaStar, FaComment, FaCalendar, FaUser } from 'react-icons/fa';

const FeedbackList = () => {
  const dispatch = useDispatch();
  const feedback = useSelector(state => state.feedback.feedbacks);

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  return (
    <Container fluid className="py-5 bg-light">
      <h2 className="mb-4">Customer Feedback</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th><FaUser className="me-2" />Customer</th>
                <th><FaStar className="me-2" />Rating</th>
                <th><FaComment className="me-2" />Comment</th>
                <th><FaCalendar className="me-2" />Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(feedback) && feedback.length > 0 ? (
                feedback.map((item) => (
                  <tr key={item._id}>
                    <td>{item.customerId?.name || 'N/A'}</td>
                    <td>{item.rating}</td>
                    <td>{item.comment}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No feedback available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
);
};

export default FeedbackList;