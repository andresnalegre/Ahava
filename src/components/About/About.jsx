import React from 'react';
import './About.css';

const About = () => {
  const values = [
    'Deliver high quality craftsmanship in every candle',
    '100% natural and sustainable ingredients',
    'Ensure quality at every stage of the process',
    'Create sensory and memorable experiences'
  ];

  const stats = [
    {
      number: '600+',
      label: 'Happy Customers'
    },
    {
      number: '6',
      label: 'Exclusive Scents'
    }
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <h2 className="about-title">About Us</h2>
          <p className="about-subtitle">
            Inspired by the natural elegance and the transformative power of scent
          </p>
        </div>

        {/* Content Grid */}
        <div className="about-grid">
          {/* Left Column - Story Content */}
          <div className="about-content">
            <div className="story-section">
              <h3 className="story-title">Essence of Ahava</h3>
              <p className="story-text">
                From Zurich to the world, Ahava was born from the desire to create unique candles that offer unforgettable experiences beyond fragrance.
              </p>
            </div>

            <div className="story-section">
              <h3 className="story-title">The Production</h3>
              <p className="story-text">
                Our candles are thoughtfully assembled by hand, using natural wax, premium essential oils, and cotton wicks. Each piece is unique, crafted not only to release a beautiful scent, but to offer a complete sensory experience.
              </p>
            </div>

            <div className="story-section">
              <h3 className="story-title">Our Quality</h3>
              <p className="story-text">
                We don't just deliver a product, we deliver an experience. From the excellence in every detail during the candle's creation, from the selection of raw materials to the final presentation, everything is thoughtfully crafted. For us, true luxury lies in mindful simplicity, ecological awareness, and the intention behind each creation.
              </p>
            </div>
          </div>

          {/* Right Column - Values & Stats */}
          <div className="about-sidebar">
            {/* Values Section */}
            <div className="values-section">
              <div className="values-header">
                <div className="bee-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L13.5 8.5L20 7L16.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L7.5 12L4 7L10.5 8.5L12 2Z" fill="#D97706"/>
                  </svg>
                </div>
                <h4 className="values-title">Our Values</h4>
              </div>
              <ul className="values-list">
                {values.map((value, index) => (
                  <li key={index} className="value-item">
                    <span className="value-dot"></span>
                    {value}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
