import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCustomers } from '../../store/actions/customerActions';
import { Table, Button, Container, Form, Row, Col, Card, Spinner, Pagination } from 'react-bootstrap';
import { FaSort, FaSortUp, FaSortDown, FaUserPlus, FaSearch } from 'react-icons/fa';

const CustomerList = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector(state => state.customers);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const sortedCustomers = [...customers].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCustomers = sortedCustomers.filter(customer =>
    customer.name.toLowerCase().includes(filterText.toLowerCase()) ||
    customer.email.toLowerCase().includes(filterText.toLowerCase())
  );

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container fluid className="py-5 bg-light">
      <h2 className="mb-4">Customers</h2>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Filter customers..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Col>
        <Col md={6} className="text-end">
          <Button variant="primary" as={Link} to="/customers/new">
            <FaUserPlus className="me-2" />Add New Customer
          </Button>
        </Col>
      </Row>
      <Card className="shadow-sm">
        <Table striped bordered hover responsive>
          <thead className="bg-primary text-white">
            <tr>
              <th onClick={() => handleSort('name')} className="cursor-pointer">
                Name {sortField === 'name' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('email')} className="cursor-pointer">
                Email {sortField === 'email' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('phone')} className="cursor-pointer">
                Phone {sortField === 'phone' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" as={Link} to={`/customers/${customer._id}`}>
                      View
                      </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No customers found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
      <Pagination className="mt-3 justify-content-center">
        {[...Array(Math.ceil(filteredCustomers.length / customersPerPage))].map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default CustomerList;