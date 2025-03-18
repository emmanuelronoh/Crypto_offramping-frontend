import React from "react";
import "./AboutUs.css";
import { FaBitcoin, FaMobileAlt, FaShieldAlt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        <h2 className="title">About Blif</h2>
        <p className="subtitle">
          Blif is your trusted platform for seamless crypto offramping to mobile money.
          Convert Bitcoin and other cryptocurrencies into KSH, TSH, UGX, and more with ease.
        </p>

        <div className="features">
          <div className="feature">
            <FaBitcoin className="icon" />
            <h3>Easy Crypto Offramp</h3>
            <p>Instantly convert your crypto into local currencies without hassle.</p>
          </div>

          <div className="feature">
            <FaMobileAlt className="icon" />
            <h3>Mobile Money Integration</h3>
            <p>Direct withdrawals to M-Pesa, Airtel Money, Tigo Pesa, and more.</p>
          </div>

          <div className="feature">
            <FaShieldAlt className="icon" />
            <h3>Secure & Reliable</h3>
            <p>Built with top-notch security to keep your transactions safe.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
