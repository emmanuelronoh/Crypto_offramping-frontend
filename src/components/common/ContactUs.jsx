import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for redirection
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies
import './ContactUs.css';

// Helper function to check if JWT token is expired
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
    return payload.exp * 1000 < Date.now(); // Check expiration
  } catch {
    return true; // If decoding fails, treat as expired
  }
};

const ContactUs = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    crypto_type: 'bitcoin', // Initialize with a default value
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Get JWT token from cookies
    const token = Cookies.get('jwt');

    if (!token) {
      setErrorMessage('Unauthorized: No token found. Please log in again.');
      setIsSubmitting(false);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2s
      return;
    }

    if (isTokenExpired(token)) {
      setErrorMessage('Session expired. Please log in again.');
      setIsSubmitting(false);
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2s
      return;
    }

    // Validate form data
    if (!formData.crypto_type) {
      setErrorMessage('Please select a cryptocurrency type.');
      setIsSubmitting(false);
      return;
    }

    const requestData = {
      name: formData.name,
      email: formData.email,
      crypto_type: formData.crypto_type, // Ensure this field is included
      message: formData.message,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/support-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Attach JWT token in Authorization header
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSuccessMessage('Your message has been sent! We will get back to you shortly.');
        setFormData({
          name: '',
          email: '',
          crypto_type: 'bitcoin', // Reset to default value
          message: '',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-container">
      <header>
        <h1>Contact Us</h1>
        <p>
          We’re here to assist you with any questions about our crypto offramping services. Please
          fill out the form below, and we'll get back to you as soon as possible.
        </p>
      </header>

      <section className="contact-form">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="crypto_type">Cryptocurrency Type</label>
            <select
              id="crypto_type"
              name="crypto_type"
              value={formData.crypto_type}
              onChange={handleChange}
              required
            >
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Ripple">Ripple</option>
              <option value="Litecoin">Litecoin</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;