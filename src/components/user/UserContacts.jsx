import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Container, Card, Row, Col, Modal } from 'react-bootstrap';
import { getUserContacts, deleteContact } from '../../store/actions/contactActions';
import { getCustomers } from '../../store/actions/customerActions';
import ContactForm from '../contacts/ContactForm';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const UserContacts = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts);
    const customers = useSelector(state => state.customers.customers);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);
    const error = useSelector(state => state.contacts.error);
    
    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                dispatch(getUserContacts()),
                dispatch(getCustomers())
            ]);
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            dispatch(deleteContact(id));
            toast.success('Contact deleted successfully');
        }
    };

    const handleEdit = (contact) => {
        setCurrentContact(contact);
        setShowModal(true);
    };

    const handleAdd = () => {
        setCurrentContact(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentContact(null);
    };

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
        );
    }

    return (
        <Container fluid className="py-5 bg-light">
            <Row className="mb-4">
                <Col>
                    <h2><FaUser className="me-2" />My Contacts</h2>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" onClick={handleAdd}>
                        <FaPlus className="me-2" />Add New Contact
                    </Button>
                </Col>
            </Row>
            <Card className="shadow-sm">
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="bg-primary text-white">
                            <tr>
                                <th><FaUser className="me-2" />Name</th>
                                <th><FaEnvelope className="me-2" />Email</th>
                                <th><FaPhone className="me-2" />Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact => (
                                <tr key={contact._id}>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(contact)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(contact._id)}>
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentContact ? 'Edit Contact' : 'Add New Contact'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm
                        contact={currentContact}
                        customers={customers}
                        onClose={handleCloseModal}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default UserContacts;