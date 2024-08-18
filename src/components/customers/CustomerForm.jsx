import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addCustomer, updateCustomer, getCustomer } from '../../store/actions/customerActions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTshirt, FaPalette, FaPencilAlt } from 'react-icons/fa';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone: Yup.string(),
  address: Yup.string(),
  fabricTypes: Yup.string(),
  colors: Yup.string(),
  designs: Yup.string(),
  patterns: Yup.string(),
  seasons: Yup.string(),
  occasions: Yup.string()
});

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customer = useSelector(state => state.customers.customer);

  useEffect(() => {
    if (id) {
      dispatch(getCustomer(id));
    }
  }, [dispatch, id]);

  const handleSubmit = (values) => {
    const customerData = {
      ...values,
      preferences: {
        fabricTypes: values.fabricTypes.split(',').map(item => item.trim()),
        colors: values.colors.split(',').map(item => item.trim()),
        designs: values.designs.split(',').map(item => item.trim()),
        patterns: values.patterns.split(',').map(item => item.trim()),
        seasons: values.seasons.split(',').map(item => item.trim()),
        occasions: values.occasions.split(',').map(item => item.trim())
      }
    };
    if (id) {
      dispatch(updateCustomer(id, customerData));
      toast.success('Customer updated successfully');
    } else {
      dispatch(addCustomer(customerData));
      toast.success('Customer added successfully');
    }
    navigate('/customers');
  };

  return (
    <Container fluid className="py-5 bg-light">
      <h2 className="mb-4">{id ? 'Edit Customer' : 'Add New Customer'}</h2>
      <Formik
        initialValues={{
          name: customer?.name || '',
          username: customer?.username || '',
          email: customer?.email || '',
          phone: customer?.phone || '',
          address: customer?.address || '',
          fabricTypes: customer?.preferences?.fabricTypes.join(', ') || '',
          colors: customer?.preferences?.colors.join(', ') || '',
          designs: customer?.preferences?.designs.join(', ') || '',
          patterns: customer?.preferences?.patterns.join(', ') || '',
          seasons: customer?.preferences?.seasons.join(', ') || '',
          occasions: customer?.preferences?.occasions.join(', ') || ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Col md={6}>
                <Card className="mb-4 shadow-sm">
                  <Card.Header className="bg-primary text-white">
                    <FaUser className="me-2" />Personal Information
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <Field name="name" type="text" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} />
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <Field name="username" type="text" className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`} />
                      <ErrorMessage name="username" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label"><FaEnvelope className="me-2" />Email</label>
                      <Field name="email" type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label"><FaPhone className="me-2" />Phone</label>
                      <Field name="phone" type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label"><FaMapMarkerAlt className="me-2" />Address</label>
                      <Field name="address" as="textarea" className="form-control" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-4 shadow-sm">
                  <Card.Header className="bg-success text-white">
                    <FaTshirt className="me-2" />Preferences
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <label htmlFor="fabricTypes" className="form-label">Fabric Types</label>
                      <Field name="fabricTypes" type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="colors" className="form-label"><FaPalette className="me-2" />Colors</label>
                      <Field name="colors" type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="designs" className="form-label"><FaPencilAlt className="me-2" />Designs</label>
                      <Field name="designs" type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="patterns" className="form-label">Patterns</label>
                      <Field name="patterns" type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="seasons" className="form-label">Seasons</label>
                      <Field name="seasons" type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="occasions" className="form-label">Occasions</label>
                      <Field name="occasions" type="text" className="form-control" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Button type="submit" variant="primary">
              {id ? 'Update Customer' : 'Add Customer'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default CustomerForm;