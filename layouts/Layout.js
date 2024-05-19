import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles.css';
import { GoogleTagManager } from '@next/third-parties/google'

export default function Layout({ children }) {
  return (

  <div>
      <GoogleTagManager gtmId="GTM-M3V57XTR" />
      <div>

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
        </div>

        </div>




  );
}
