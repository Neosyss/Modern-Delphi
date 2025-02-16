import React, { useEffect, useState } from 'react';
import './ErrorBox.css';

const ErrorBox = ({ message, show, onClose, green=0,timeout = 2500 }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);

    if (show && timeout) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [show, timeout, onClose]);

  if (!visible) return null;

  return (
    <div className={`error-box ${green == 1 ? "green" : ''}`}>
      <div className="error-content">
        <span>{message}</span>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ErrorBox;