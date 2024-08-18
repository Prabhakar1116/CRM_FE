import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast, ToastContainer } from 'react-bootstrap';
import { removeNotification } from '../../store/actions/notificationAction';

const Notifications = () => {
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  const handleClose = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
      {Array.isArray(notifications) && notifications.map((notification) => (
        <Toast key={notification.id} onClose={() => handleClose(notification.id)} show={true} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">{notification.title}</strong>
          </Toast.Header>
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default Notifications;