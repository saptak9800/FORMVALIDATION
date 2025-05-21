import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessPage.css'; // Make sure to create this CSS file

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get formData from location state
  const formData = location.state?.formData;

  // If no form data is present, redirect to home
  React.useEffect(() => {
    if (!formData) {
      console.log("No form data found, redirecting to home");
      navigate('/');
    } else {
      console.log("Form data received:", formData);
    }
  }, [formData, navigate]);

  // Return null while redirecting if no data
  if (!formData) {
    return <div>Redirecting...</div>;
  }

  // Helper function to format country name for display
  const formatCountryName = (countryValue) => {
    const countryMap = {
      "india": "India",
      "usa": "USA",
      "uk": "UK"
    };
    return countryMap[countryValue] || countryValue;
  };

  return (
    <div className="success-page">
      <div className="success-container">
        <h1>Registration Successful! 🎉</h1>
        <div className="details-container">
          <h2>Submitted Details:</h2>
          <div className="details-grid">
            <div className="detail-item">
              <strong>First Name:</strong> {formData.firstName}
            </div>
            <div className="detail-item">
              <strong>Last Name:</strong> {formData.lastName}
            </div>
            <div className="detail-item">
              <strong>Username:</strong> {formData.username}
            </div>
            <div className="detail-item">
              <strong>Email:</strong> {formData.email}
            </div>
            <div className="detail-item">
              <strong>Phone:</strong> {formData.countryCode} {formData.phoneNumber}
            </div>
            <div className="detail-item">
              <strong>Country:</strong> {formatCountryName(formData.country)}
            </div>
            <div className="detail-item">
              <strong>City:</strong> {formData.city}
            </div>
            <div className="detail-item">
              <strong>PAN Number:</strong> {formData.panNumber}
            </div>
            <div className="detail-item">
              <strong>Aadhar Number:</strong> {formData.aadharNumber}
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="back-button"
          >
            Back to Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;