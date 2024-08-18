import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCommunications, deleteCommunication } from '../../store/actions/communicationActions';
import { getCustomers } from '../../store/actions/customerActions';
import { Table, Button, Container, Modal, Card, Row, Col } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaComments, FaUser, FaCalendar } from 'react-icons/fa';
import CommunicationForm from './CommunicationForm';

const CommunicationList = () => {
  const dispatch = useDispatch();
  const communications = useSelector(state => state.communications.communications);
  const customers = useSelector(state => state.customers.customers);
  const [showModal, setShowModal] = useState(false);
  const [currentCommunication, setCurrentCommunication] = useState(null);

  useEffect(() => {
    dispatch(getCommunications());
    dispatch(getCustomers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this communication?')) {
      dispatch(deleteCommunication(id));
    }
  };

  const handleEdit = (communication) => {
    setCurrentCommunication(communication);
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentCommunication(null);
    setShowModal(true);
  };

  return (
    <Container fluid className="py-5 bg-light">
      <Row className="mb-4">
        <Col>
          <h2>Communications</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleAdd}>
            <FaPlus className="me-2" />Add New Communication
          </Button>
        </Col>
      </Row>
      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th><FaUser className="me-2" />Customer</th>
                <th><FaComments className="me-2" />Type</th>
                <th><FaCalendar className="me-2" />Date</th>
                <th>Summary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {communications.map((communication) => (
                <tr key={communication._id}>
                  <td>{communication.customerId?.name || 'N/A'}</td>
                  <td>{communication.type}</td>
                  <td>{new Date(communication.date).toLocaleDateString()}</td>
                  <td>{communication.summary}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(communication)}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(communication._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentCommunication ? 'Edit Communication' : 'Add New Communication'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CommunicationForm communication={currentCommunication} onClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CommunicationList;