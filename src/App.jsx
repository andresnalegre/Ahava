import React, { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Collection from './components/Collection/Collection';
import Products from './components/Products/Products';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';
import './index.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState({});
  const [products] = useState([
    {
      id: 1,
      name: 'Honey Lavender Bliss',
      image: '../src/assets/candle1.png',
      price: 28.99,
      originalPrice: 34.99,
      description: 'A soothing blend of organic honey and French lavender, perfect for relaxation and meditation.',
      features: ['Natural Soy Wax', 'Cotton Wick', '60+ Hour Burn', 'Hand-Poured'],
      scent: 'Floral & Sweet'
    },
    {
      id: 2,
      name: 'Golden Vanilla Dream',
      image: '../src/assets/candle2.png',
      price: 32.99,
      originalPrice: 39.99,
      description: 'Rich vanilla bean essence with golden honey notes creates a warm, comforting atmosphere.',
      features: ['Premium Essential Oils', 'Lead-Free Wick', '70+ Hour Burn', 'Eco-Friendly'],
      scent: 'Warm & Creamy'
    },
    {
      id: 3,
      name: 'Eucalyptus Mint Fresh',
      image: '../src/assets/candle3.png',
      price: 26.99,
      originalPrice: 31.99,
      description: 'Invigorating eucalyptus and refreshing mint create an energizing and cleansing ambiance.',
      features: ['Therapeutic Grade', 'Natural Botanicals', '55+ Hour Burn', 'Aromatherapy'],
      scent: 'Fresh & Crisp'
    },
    {
      id: 4,
      name: 'Citrus Honey Burst',
      image: '../src/assets/candle4.png',
      price: 29.99,
      originalPrice: 35.99,
      description: 'Zesty citrus fruits harmonize with golden honey for an uplifting and energetic fragrance.',
      features: ['Organic Ingredients', 'Slow Burn Formula', '65+ Hour Burn', 'Mood Enhancing'],
      scent: 'Bright & Citrusy'
    },
    {
      id: 5,
      name: 'Amber Rose Garden',
      image: '../src/assets/candle5.png',
      price: 34.99,
      originalPrice: 42.99,
      description: 'Luxurious amber and delicate rose petals create an elegant and romantic atmosphere.',
      features: ['Premium Rose Oil', 'Natural Amber', '75+ Hour Burn', 'Limited Edition'],
      scent: 'Romantic & Elegant'
    },
    {
      id: 6,
      name: 'Ocean Breeze Serenity',
      image: '../src/assets/candle6.png',
      price: 30.99,
      originalPrice: 37.99,
      description: 'Fresh ocean air and coastal botanicals bring the tranquility of the seaside to your home.',
      features: ['Sea Salt Crystals', 'Marine Botanicals', '68+ Hour Burn', 'Coastal Inspired'],
      scent: 'Fresh & Aquatic'
    }
  ]);

  const handleCartUpdate = (newCartItems) => {
    setCartItems(newCartItems);
    const totalItems = Object.values(newCartItems).reduce((total, quantity) => total + quantity, 0);
    setCartCount(totalItems);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartItems = { ...cartItems };
    delete newCartItems[productId];
    handleCartUpdate(newCartItems);
  };

  const handleUpdateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      const newCartItems = {
        ...cartItems,
        [productId]: newQuantity
      };
      handleCartUpdate(newCartItems);
    }
  };

  return (
    <div className="app">
      <Header 
        cartCount={cartCount}
        cartItems={cartItems}
        products={products}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateCartQuantity={handleUpdateCartQuantity}
      />
      <main className="main-content">
        <Hero />
        <About />
        <Collection />
        <Products 
          products={products}
          cartItems={cartItems}
          onCartUpdate={handleCartUpdate} 
        />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;