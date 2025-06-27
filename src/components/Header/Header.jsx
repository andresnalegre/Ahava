import React, { useState } from 'react';
import './Header.css';

const Header = ({ cartCount = 0, cartItems = {}, products = [], onRemoveFromCart, onUpdateCartQuantity }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  // Calcular total do carrinho
  const calculateTotal = () => {
    return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return total + (product ? product.price * quantity : 0);
    }, 0).toFixed(2);
  };

  // Produtos no carrinho
  const cartProducts = Object.entries(cartItems)
    .filter(([_, quantity]) => quantity > 0)
    .map(([productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return product ? { ...product, quantity } : null;
    })
    .filter(Boolean);

  const handleRemoveItem = (productId) => {
    if (onRemoveFromCart) {
      onRemoveFromCart(productId);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (onUpdateCartQuantity) {
      onUpdateCartQuantity(productId, newQuantity);
    }
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-container">
          {/* Logo */}
          <div className="header-logo">
            <h1>Ahava</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <div className="desktop-nav-list">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Cart Button */}
            <div className="cart-container">
              <button 
                className="cart-button" 
                aria-label="Shopping cart"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <svg className="cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M16 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span className={`cart-count ${cartCount > 0 ? 'cart-count-active' : ''}`}>
                  {cartCount}
                </span>
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="cart-dropdown">
                  <div className="cart-dropdown-header">
                    <h3>Shopping Cart</h3>
                    <button 
                      className="cart-close-btn"
                      onClick={() => setIsCartOpen(false)}
                      aria-label="Close cart"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="cart-dropdown-content">
                    {cartProducts.length === 0 ? (
                      <div className="cart-empty">
                        <p>Your cart is empty</p>
                      </div>
                    ) : (
                      <>
                        <div className="cart-items">
                          {cartProducts.map((product) => (
                            <div key={product.id} className="cart-item">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="cart-item-image"
                              />
                              <div className="cart-item-details">
                                <h4 className="cart-item-name">{product.name}</h4>
                                <p className="cart-item-price">${product.price}</p>
                                <div className="cart-item-quantity">
                                  <button 
                                    className="quantity-btn-cart"
                                    onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                                    disabled={product.quantity <= 1}
                                  >
                                    -
                                  </button>
                                  <span className="quantity-display-cart">{product.quantity}</span>
                                  <button 
                                    className="quantity-btn-cart"
                                    onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="cart-item-actions">
                                <p className="cart-item-total">${(product.price * product.quantity).toFixed(2)}</p>
                                <button 
                                  className="remove-item-btn"
                                  onClick={() => handleRemoveItem(product.id)}
                                  title="Remove from cart"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="cart-dropdown-footer">
                          <div className="cart-total">
                            <strong>Total: ${calculateTotal()}</strong>
                          </div>
                          <button className="checkout-btn">
                            Proceed to Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-menu-button">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-btn"
                aria-label="Open menu"
              >
                <svg className="mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-list">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Cart Overlay */}
        {isCartOpen && (
          <div 
            className="cart-overlay"
            onClick={() => setIsCartOpen(false)}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;