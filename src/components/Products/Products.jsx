import React, { useState } from 'react';
import './Products.css';

const Products = ({ products, cartItems, onCartUpdate }) => {
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantities(prev => ({
        ...prev,
        [productId]: newQuantity
      }));
    }
  };

  const addToCart = (productId) => {
    const quantity = quantities[productId] || 1;
    const newCartItems = {
      ...cartItems,
      [productId]: (cartItems[productId] || 0) + quantity
    };
    onCartUpdate(newCartItems);
    
    // Reset quantity to 1 after adding to cart
    setQuantities(prev => ({
      ...prev,
      [productId]: 1
    }));
  };

  return (
    <section className="products-section">
      <div className="products-container">
        {/* Header */}
        <div className="products-header">
          <h2 className="products-title">Our Products</h2>
          <p className="products-description">
            Crafted to evoke new emotion and create the perfect ambiance for any moment.
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Product Image */}
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-overlay">
                  <span className="product-scent">{product.scent}</span>
                </div>
              </div>

              {/* Product Content */}
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                {/* Features */}
                <ul className="product-features">
                  {product.features.map((feature, index) => (
                    <li key={index} className="product-feature">
                      <span className="feature-dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price and Actions */}
                <div className="product-footer">
                  <div className="product-pricing">
                    <span className="product-price">${product.price}</span>
                    <span className="product-original-price">${product.originalPrice}</span>
                  </div>

                  <div className="product-actions">
                    {/* Quantity Selector */}
                    <div className="quantity-selector">
                      <label className="quantity-label">Qty:</label>
                      <div className="quantity-input-group">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) - 1)}
                          disabled={(quantities[product.id] || 1) <= 1}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="quantity-input"
                          value={quantities[product.id] || 1}
                          onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                          min="1"
                          max="99"
                        />
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) + 1)}
                          disabled={(quantities[product.id] || 1) >= 99}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product.id)}
                    >
                      <svg className="cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M16 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="products-cta">
          <p className="cta-text">Looking for something personalized?</p>
          <button className="cta-button">
            Create Custom Candle
            <svg className="cta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;