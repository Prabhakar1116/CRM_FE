import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, ListGroup, Spinner, Button, Container } from 'react-bootstrap';
import { getUserDashboardData, getPopularTextileChoices } from '../store/actions/dashboardActions';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { FaUsers, FaChartLine, FaTshirt, FaCalendarAlt } from 'react-icons/fa';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector(state => state.dashboard);
  const { recentCustomers = [], recentCommunications = [], loading, error } = dashboard || {};
  const user = useSelector(state => state.auth.user);
  const authLoading = useSelector(state => state.auth.loading);
  const [popularFabrics, setPopularFabrics] = useState([]);

  useEffect(() => {
    dispatch(getUserDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (dashboard.popularTextileChoices) {
      const fabricData = dashboard.popularTextileChoices.map((item) => ({
        name: item._id,
        value: item.count
      }));
      setPopularFabrics(fabricData);
    }
  }, [dashboard.popularTextileChoices]);

  if (authLoading || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>Error loading dashboard data: {error}</div>;
  }

  if (!user) {
    return <div>User data not available. Please try logging in again.</div>;
  }
  return (
    <Container fluid className="py-5 bg-light">
      <h2 className="mb-4">Welcome, {user.name}</h2>
      <Row>
        <Col md={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Customers</h6>
                  <h3>{dashboard.totalCustomers}</h3>
                </div>
                <FaUsers size={30} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">New Customers This Month</h6>
                  <h3>{dashboard.newCustomersThisMonth}</h3>
                </div>
                <FaChartLine size={30} className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Top Spending Customer</h6>
                  <h3>{dashboard.topSpendingCustomer?.name || 'N/A'}</h3>
                </div>
                <FaTshirt size={30} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Recent Communications</h6>
                  <h3>{recentCommunications.length}</h3>
                </div>
                <FaCalendarAlt size={30} className="text-info" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-primary text-white">Recent Customers</Card.Header>
            <ListGroup variant="flush">
              {recentCustomers.map(customer => (
                <ListGroup.Item key={customer._id} action as={Link} to={`/customers/${customer._id}`}>
                  {customer.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-success text-white">Recent Communications</Card.Header>
            <ListGroup variant="flush">
              {recentCommunications.map(comm => (
                <ListGroup.Item key={comm._id}>
                  {comm.type} with {comm.customerName} on {new Date(comm.date).toLocaleDateString()}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-info text-white">Popular Fabrics</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={popularFabrics}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {popularFabrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-warning text-dark">Monthly Sales</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboard.monthlySales || []}>
                  <XAxis dataKey="_id" tickFormatter={(value) => {
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    return months[value - 1];
                  }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};

export default Dashboard;