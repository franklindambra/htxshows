import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <Link href="/terms-of-service">
          <a><p>Terms of Service</p></a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
