import React, { useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addFeedback } from '../../store/actions/feedbackActions';
import { getCustomers } from '../../store/actions/customerActions';
import { toast } from 'react-toastify';
import { FaUser, FaStar, FaComment } from 'react-icons/fa';

const validationSchema = Yup.object({
  customerId: Yup.string().required('Required'),
  rating: Yup.number().required('Required').min(1).max(5),
  comment: Yup.string()
});

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customers.customers);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addFeedback(values));
    resetForm();
    toast.success('Feedback added successfully');
  };

  return (
    <Container fluid className="py-5 bg-light">
      <h2 className="mb-4">Add Feedback</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Formik
            initialValues={{ customerId: '', rating: '', comment: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><FaUser className="me-2" />Customer</Form.Label>
                      <Field as="select" name="customerId" className={`form-control ${errors.customerId && touched.customerId ? 'is-invalid' : ''}`}>
                        <option value="">Select a customer</option>
                        {customers.map(customer => (
                          <option key={customer._id} value={customer._id}>{customer.name}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="customerId" component="div" className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label><FaStar className="me-2" />Rating</Form.Label>
                      <Field as="select" name="rating" className={`form-control ${errors.rating && touched.rating ? 'is-invalid' : ''}`}>
                        <option value="">Select rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Field>
                      <ErrorMessage name="rating" component="div" className="invalid-feedback" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label><FaComment className="me-2" />Comment</Form.Label>
                  <Field as="textarea" name="comment" className="form-control" rows={4} />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Submit Feedback
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FeedbackForm;