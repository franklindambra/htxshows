import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles.css';

export default function Layout({ children }) {
  return (
    <>
      <div className="background-container">
        <Navbar />
        <main>

          <div className="container">
            <div className="column left-column">
              {/* Content for the left column */}
              
            </div>
            <div className="column middle-column">
              {children}
            </div>
            <div className="column right-column">
              {/* Content for the right column */}
              
            </div>
          </div>

        </main>
        <Footer />
      </div>
    </>
  );
}
