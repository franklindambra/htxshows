import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <Link href="/terms-of-service">
          <p>Terms of Service</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
