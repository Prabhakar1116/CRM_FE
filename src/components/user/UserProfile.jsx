import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import { updateUserProfile } from '../../store/actions/userActions';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaSave, FaUserCircle } from 'react-icons/fa';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: '', confirmPassword: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setUpdateError('Passwords do not match');
      return;
    }
    try {
      await dispatch(updateUserProfile(formData));
      setUpdateSuccess(true);
      setUpdateError(null);
      toast.success('User profile updated successfully');
    } catch (error) {
      setUpdateError('Failed to update profile. Please try again.');
      setUpdateSuccess(false);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <Container fluid className="py-5 bg-light">
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="shadow-sm">
          <Card.Header className="bg-primary text-white">
            <h2 className="mb-0"><FaUserCircle className="me-2" />User Profile</h2>
          </Card.Header>
          <Card.Body>
            {updateSuccess && <Alert variant="success">Profile updated successfully!</Alert>}
            {updateError && <Alert variant="danger">{updateError}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label><FaUser className="me-2" />Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
...
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label><FaLock className="me-2" />New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label><FaLock className="me-2" />Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit" size="lg">
                  <FaSave className="me-2" />Update Profile
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default UserProfile;