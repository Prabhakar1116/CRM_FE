import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Badge, Container, Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { getQueries, updateCommunication } from '../../store/actions/communicationActions';
import { FaSort, FaSortUp, FaSortDown, FaEdit } from 'react-icons/fa';
import { createSelector } from '@reduxjs/toolkit';

const selectQueries = createSelector(
  state => state.communication?.queries,
  queries => queries || []
);

const QueryList = () => {
    const dispatch = useDispatch();
    const queries = useSelector(state => {
    return state.communications?.queries || [];
  });
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showModal, setShowModal] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(null);

  useEffect(() => {
    dispatch(getQueries()).then(result => {
    });
  }, [dispatch]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedQueries = [...queries].sort((a, b) => {
    const aValue = sortField.split('.').reduce((obj, key) => obj?.[key], a);
    const bValue = sortField.split('.').reduce((obj, key) => obj?.[key], b);
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge bg="danger">High</Badge>;
      case 'medium':
        return <Badge bg="warning">Medium</Badge>;
      case 'low':
        return <Badge bg="success">Low</Badge>;
      default:
        return null;
    }
  };

  const handleEdit = (query) => {
    setCurrentQuery(query);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedQuery = {
      ...currentQuery,
      status: e.target.status.value,
      priority: e.target.priority.value,
    };
    await dispatch(updateCommunication(currentQuery._id, updatedQuery));
    dispatch(getQueries());
    setShowModal(false);
  };

  return (
    <Container fluid className="py-5 bg-light">
      <h2 className="mb-4">Customer Queries</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th onClick={() => handleSort('customerId.name')} className="cursor-pointer">
                  Customer {sortField === 'customerId.name' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th onClick={() => handleSort('summary')} className="cursor-pointer">
                  Summary {sortField === 'summary' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th onClick={() => handleSort('priority')} className="cursor-pointer">
                  Priority {sortField === 'priority' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th onClick={() => handleSort('status')} className="cursor-pointer">
                  Status {sortField === 'status' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th onClick={() => handleSort('date')} className="cursor-pointer">
                  Created At {sortField === 'date' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedQueries.length > 0 ? (
                sortedQueries.map(query => (
                  <tr key={query._id}>
                    <td>{query.customerId?.name}</td>
                    <td>{query.summary}</td>
                    <td>{getPriorityBadge(query.priority)}</td>
                    <td>{query.status}</td>
                    <td>{new Date(query.date).toLocaleString()}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" onClick={() => handleEdit(query)}>
                        <FaEdit />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No queries found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" defaultValue={currentQuery?.status}>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" name="priority" defaultValue={currentQuery?.priority}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Query
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default QueryList;