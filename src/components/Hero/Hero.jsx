import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Signature Artisan Candles
        </h1>
        
        <p className="hero-subtitle">
          Your exclusive moment, born with every flame.
        </p>
        
        <button className="hero-cta">
          More
        </button>
      </div>
    </section>
  );
};

export default Hero;