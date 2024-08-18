import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../store/actions/authActions';
import { Container, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  role: Yup.string().oneOf(['user', 'admin'], 'Invalid role').required('Required'),
  adminCode: Yup.string().test('admin-code-required', 'Admin code is required when role is admin', function(value) {
    return this.parent.role !== 'admin' || (this.parent.role === 'admin' && value);
  })
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminCode = import.meta.env.ADMIN_REGISTRATION_CODE;

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    adminCode: '',
  };

  const handleSubmit = async (values) => {
    try {
      const redirectPath = await dispatch(register({ ...values, role: values.role || 'user' }));
      navigate(redirectPath);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col xl={12} sm={10} md={8} lg={6} xs={4} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-lg">
            <Card.Body className="p-5">
              <h2 className="text-center font-weight-light my-4">Register</h2>
              <Formik
                initialValues={{ name: '', email: '', password: '', confirmPassword: '', role: 'user', adminCode: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values }) => (
                  <Form>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FaUser />
                      </InputGroup.Text>
                      <Field
                        type="text"
                        name="name"
                        className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                        placeholder="Full Name"
                      />
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </InputGroup>
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
                    <InputGroup className="mb-3">
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
                    <InputGroup className="mb-4">
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Confirm Password"
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FaUserShield />
                      </InputGroup.Text>
                      <Field
                        as="select"
                        name="role"
                        className={`form-control ${errors.role && touched.role ? 'is-invalid' : ''}`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </Field>
                      <ErrorMessage name="role" component="div" className="invalid-feedback" />
                    </InputGroup>
                    {values.role === 'admin' && (
                      <InputGroup className="mb-3">
                        <InputGroup.Text>
                          <FaLock />
                        </InputGroup.Text>
                        <Field
                          type="password"
                          name="adminCode"
                          className={`form-control ${errors.adminCode && touched.adminCode ? 'is-invalid' : ''}`}
                          placeholder="Admin Code"
                        />
                        <ErrorMessage name="adminCode" component="div" className="invalid-feedback" />
                      </InputGroup>
                    )}
                    <div className="d-grid">
                      <Button type="submit" variant="primary" size="lg">
                        Register
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="text-center mt-3">
                <p className="text-muted">Already have an account? <Link to="/login" className="text-decoration-none">Login</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;