import React from 'react';
import './Contact.css';

const Contact = () => {
  const contactMethods = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27099 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.21649 3.36162C2.3051 3.09849 2.44748 2.85669 2.63469 2.65162C2.8219 2.44655 3.04974 2.28271 3.30372 2.17052C3.55771 2.05833 3.83227 2.00026 4.11 2H7.11C7.59531 1.99522 8.06627 2.16708 8.43845 2.48353C8.81063 2.79999 9.06254 3.23945 9.14 3.72C9.28401 4.68007 9.53824 5.62273 9.89 6.53C10.0197 6.88792 10.0394 7.27691 9.94707 7.64873C9.85474 8.02055 9.64896 8.35362 9.36 8.6L8.09 9.87C9.51355 12.4135 11.5865 14.4865 14.13 15.91L15.4 14.64C15.6464 14.351 15.9795 14.1453 16.3513 14.0529C16.7231 13.9606 17.1121 13.9803 17.47 14.11C18.3773 14.4618 19.3199 14.716 20.28 14.86C20.7658 14.9384 21.2094 15.1932 21.5265 15.5694C21.8437 15.9456 22.0122 16.4201 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Call Us',
      subtitle: 'Mon - Fri: 9:00 AM - 6:00 PM',
      contact: '(555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Email Us',
      subtitle: "We'll respond within 24 hours",
      contact: 'contact@ahavahandmade.com',
      link: 'mailto:contact@ahavahandmade.com'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Visit Us',
      subtitle: '123 Artisan Street',
      contact: 'Craftville, CA 90210',
      link: 'https://maps.google.com/?q=123+Artisan+Street+Craftville+CA+90210'
    }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: 'f',
      url: 'https://facebook.com/ahava'
    },
    {
      name: 'Instagram',
      icon: 'ig',
      url: 'https://instagram.com/ahava'
    },
    {
      name: 'Twitter',
      icon: 'tw',
      url: 'https://twitter.com/ahava'
    }
  ];

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-description">
            Support, custom candles, or questions? Get in touch.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="contact-methods">
          {contactMethods.map((method, index) => (
            <div key={index} className="contact-card">
              <div className="contact-icon">
                {method.icon}
              </div>
              <h3 className="contact-method-title">{method.title}</h3>
              <p className="contact-subtitle">{method.subtitle}</p>
              <a href={method.link} className="contact-link">
                {method.contact}
              </a>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="social-section">
          <div className="social-icons">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                className="social-link"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="social-text">
            Stay connected on social media for the latest news.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;