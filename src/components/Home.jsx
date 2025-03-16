import React from "react";
import "./Hero-section.css";
import { motion } from "framer-motion";
import bitcoinImage from "../assets/bitcoin.png";
import ethereumImage from "../assets/ethereum.png";
import solanaImage from "../assets/solana.png";
import mpesaImage from "../assets/mpesa.svg";
import chatbotIcon from "../assets/chatbot.png";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Your Gateway to Instant Crypto Offramping</h1>
        <p>Convert Bitcoin, Ethereum, Solana & more into instant KSH via M-Pesa & Airtel Money.</p>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <motion.div className="step" whileHover={{ scale: 1.05 }}>
            <span>1</span>
            <p>Select your preferred cryptocurrency & enter recipient details</p>
          </motion.div>
          <motion.div className="step" whileHover={{ scale: 1.05 }}>
            <span>2</span>
            <p>Send your crypto securely via our trusted network</p>
          </motion.div>
          <motion.div className="step" whileHover={{ scale: 1.05 }}>
            <span>3</span>
            <p>Receive KSH instantly via M-Pesa, Airtel Money, or bank transfer</p>
          </motion.div>
        </div>
      </section>

      {/* Supported Cryptos Section */}
      <section className="supported-cryptos">
        <h2>Supported Cryptocurrencies</h2>
        <div className="crypto-icons">
          <motion.img src={bitcoinImage} alt="Bitcoin" whileHover={{ scale: 1.1 }} />
          <motion.img src={ethereumImage} alt="Ethereum" whileHover={{ scale: 1.1 }} />
          <motion.img src={solanaImage} alt="Solana" whileHover={{ scale: 1.1 }} />
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="payment-methods">
        <h2>Available Payment Methods</h2>
        <div className="payment-icons">
          <motion.img src={mpesaImage} alt="M-Pesa" whileHover={{ scale: 1.1 }} />
        </div>
      </section>

      {/* Live Exchange Rates */}
      <motion.section
        className="live-rates"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2>Live Exchange Rates</h2>
        <motion.p whileHover={{ scale: 1.05 }}>Bitcoin →  KSH 6,500,000</motion.p>
        <motion.p whileHover={{ scale: 1.05 }}>Ethereum → KSH 400,000</motion.p>
        <motion.p whileHover={{ scale: 1.05 }}>Solana → KSH 12,000</motion.p>
      </motion.section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"Fast and reliable! My BTC was converted to KSH within minutes."</p>
          <span>- Jane, Nairobi</span>
        </div>
        <div className="testimonial">
          <p>"The best offramping service I've used. Highly recommend!"</p>
          <span>- Brian, Mombasa</span>
        </div>
      </section>

      {/* Floating CTA Button */}
      <motion.button
        className="floating-cta"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Start Now
      </motion.button>

    </div>
  );
};

export default Home;
