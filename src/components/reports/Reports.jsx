import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSalesReport, getConversionRates } from '../../store/actions/reportActions';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const dispatch = useDispatch();
  const salesReport = useSelector(state => state.reports.salesReport);
  const conversionRates = useSelector(state => state.reports.conversionRates);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    dispatch(getSalesReport(dateRange.startDate, dateRange.endDate));
    dispatch(getConversionRates());
  }, [dispatch, dateRange]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Reports</h2>
      <Row>
        <Col xs={12} md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Sales Report</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesReport}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalSales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Conversion Rates</h5>
              <p>Total Customers: {conversionRates.totalCustomers}</p>
              <p>Converted Customers: {conversionRates.convertedCustomers}</p>
              <p>Conversion Rate: {conversionRates.conversionRate?.toFixed(2)}%</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;