import React from 'react';
import './Collection.css';

const Collection = () => {
  const premiumFeatures = [
    'Honey Lavender Bliss',
    'Golden Vanilla Dream',
    'Eucalyptus Mint Fresh',
    'Citrus Honey Burst',
    'Amber Rose Garden',
    'Ocean Breeze Serenity'
  ];

  const craftFeatures = [
    'Natural Soy Wax',
    'Cotton Wicks',
    'Essential Oils',
    'Slow Burn'
  ];

  return (
    <section className="collection-section">
      <div className="collection-container">
        {/* Header */}
        <div className="collection-header">
          <h2 className="collection-title">Our Collection</h2>
          <p className="collection-description">
            Discover our collection crafted exclusively for you. Each candle is unique and made with premium natural ingredients.
          </p>
        </div>

        {/* Premium Collection */}
        <div className="collection-row">
          <div className="collection-image">
            <img 
              src="../src/assets/candle_collection.png" 
              alt="Premium Candle Collection"
              className="collection-img"
            />
          </div>
          <div className="collection-content">
            <h3 className="collection-subtitle">Premium Collection</h3>
            <p className="collection-text">
              Our signature range features candles crafted from 100% natural soy wax, infused with pure essential oils, and finished with cotton wicks to ensure a clean and long lasting burn.
            </p>
            <ul className="collection-features">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-dot"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Artisan Craftsmanship */}
        <div className="collection-row reverse">
          <div className="collection-content">
            <h3 className="collection-subtitle">Crafted with Care</h3>
            <p className="collection-text">
              Each candle is handmade, ensuring quality in every detail. We are dedicated to creating candles that delight with their aroma and enhance the decor of your home.
            </p>
            <div className="craft-badges">
              {craftFeatures.map((feature, index) => (
                <span key={index} className="craft-badge">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="collection-image">
            <img 
              src="../src/assets/single_candle.png" 
              alt="Artisan Candle"
              className="collection-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;