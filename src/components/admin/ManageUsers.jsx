import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, InputGroup, FormControl, Container, Card, Row, Col } from 'react-bootstrap';
import { getUsers, updateUser, deleteUser, addUser } from '../../store/actions/userActions';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaUserCog, FaSearch, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

const ManageUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
      toast.success('User deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser._id) {
      dispatch(updateUser(selectedUser._id, selectedUser));
      toast.success('User updated successfully');
    } else {
      dispatch(addUser(selectedUser));
      toast.success('User added successfully');
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleAddNew = () => {
    setSelectedUser({ name: '', email: '', role: 'user' });
    setShowModal(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="py-5 bg-light">
      <Row className="mb-4">
        <Col>
          <h2><FaUserCog className="me-2" />Manage Users</h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleAddNew}>
            <FaUserPlus className="me-2" />Add New User
          </Button>
        </Col>
      </Row>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <FormControl
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th><FaUser className="me-2" />Name</th>
                <th><FaEnvelope className="me-2" />Email</th>
                <th><FaUserCog className="me-2" />Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(user)}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser && selectedUser._id ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedUser ? selectedUser.name : ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={selectedUser ? selectedUser.email : ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={selectedUser ? selectedUser.role : 'user'}
                onChange={handleInputChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {selectedUser && selectedUser._id ? 'Update User' : 'Add User'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageUsers;