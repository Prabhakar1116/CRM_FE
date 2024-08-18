import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTextileSpecificReport } from '../../store/actions/reportActions';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FaCalendar, FaTshirt, FaChartBar } from 'react-icons/fa';

const AdminReports = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const textileReport = useSelector(state => state.reports.textileSpecificReport);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      dispatch(getTextileSpecificReport(dateRange));
    }
  }, [dispatch, dateRange]);

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getTextileSpecificReport(dateRange));
  };

  return (
    <Container fluid className="py-5 bg-light">
      <h2 className="mb-4">Textile Shop Reports</h2>
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <FaCalendar className="me-2" />Select Date Range
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={5}>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" name="startDate" onChange={handleDateChange} value={dateRange.startDate} />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" name="endDate" onChange={handleDateChange} value={dateRange.endDate} />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button type="submit" variant="primary" className="w-100">
                  Generate Report
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {textileReport ? (
        <>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-success text-white">
              <FaTshirt className="me-2" />Fabric Types Sold
            </Card.Header>
            <Card.Body>
              {textileReport.fabricTypesSold && textileReport.fabricTypesSold.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={textileReport.fabricTypesSold}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="totalQuantity" fill="#8884d8" name="Quantity Sold" />
                    <Bar yAxisId="right" dataKey="totalRevenue" fill="#82ca9d" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center">No data available for fabric types sold.</p>
              )}
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-info text-white">
              <FaChartBar className="me-2" />Seasonal Trends
            </Card.Header>
            <Card.Body>
              {textileReport.seasonalTrends && textileReport.seasonalTrends.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={textileReport.seasonalTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" tickFormatter={(value) => {
                      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      return months[value - 1];
                    }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="totalSales" stroke="#8884d8" name="Total Sales" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center">No data available for seasonal trends.</p>
              )}
            </Card.Body>
          </Card>
        </>
      ) : (
        <p className="text-center">No report data available. Please select a date range and generate a report.</p>
      )}
    </Container>
  );
};

export default AdminReports;