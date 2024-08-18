import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../store/actions/authActions';
import { Container, Button, Card, Row, Col, InputGroup, ListGroup, } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required')
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const redirectPath = await dispatch(login(values.email, values.password));
      navigate(redirectPath);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col xl={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0 rounded-lg mt-5">
            <Card.Body className="p-5">
              <h2 className="text-center font-weight-light my-4">Login</h2>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FaEnvelope />
                      </InputGroup.Text>
                      <Field
                        type="email"
                        name="email"
                        className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                        placeholder="Email Address"
                      />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                      <Field
                        type="password"
                        name="password"
                        className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                        placeholder="Password"
                      />
                      <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </InputGroup>
                    <div className="d-grid">
                      <Button type="submit" variant="primary" size="lg">
                        Sign In
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="text-center mt-3">
                <p className="text-muted">Don't have an account? <Link to="/register" className="text-decoration-none">Register</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;