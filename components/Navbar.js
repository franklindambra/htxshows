// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
      <div className="logo">
        <h1 className="glow">HTXSHOWS</h1>
        <p>Houstons Premier Platform for Show Listings</p>
      </div>
      </Link>
      <div className="cta">
        <Link href="/post-show">
Post a Show
           
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
