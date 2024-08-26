import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './store/actions/authActions';
import setAuthToken from './utils/setAuthToken';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';
import Navbar from './components/layout/Navbar';
import Notifications from './components/layout/Notifications';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CustomerList from './components/customers/CustomerList';
import CustomerDetail from './components/customers/CustomerDetail';
import CustomerForm from './components/customers/CustomerForm';
import ContactList from './components/contacts/ContactList';
import CommunicationList from './components/communications/CommunicationList';
import FeedbackList from './components/feedback/FeedbackList';
import Reports from './components/reports/Reports';
import ManageUsers from './components/admin/ManageUsers';
import AdminReports from './components/admin/AdminReports';
import UserDashboard from './components/user/UserDashboard';
import UserProfile from './components/user/UserProfile';
import UserContacts from './components/user/UserContacts';
import FeedbackForm from './components/feedback/FeedbackForm';
import FollowUpForm from './components/feedback/FollowupForm';
import QueryList from './components/query/QueryList';
import RaiseQueryForm from './components/query/RaiseQueryForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Notifications />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/contacts" element={<UserContacts />} />
          <Route path="/feedback/feedbackForm" element={<FeedbackForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/:id/edit" element={<CustomerForm />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/communications" element={<CommunicationList />} />
          <Route path="/feedback" element={<FeedbackList />} />
          <Route path="/followup" element={<FollowUpForm />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/queries" element={<QueryList />} />
          <Route path="/queries/raiseQuery" element={<RaiseQueryForm />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Router>
  );
}

export default App;