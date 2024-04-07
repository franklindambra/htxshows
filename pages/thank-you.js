// pages/thank-you.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from '@/components/Layout';

export default function ThankYouPage() {
  const router = useRouter();
  const [id, setId] = useState(null);


  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToCopy);
    setCopied(true); // Set copied state to true
    // Reset copied state after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  useEffect(() => {
    const { uuid } = router.query;
    if (uuid) {
      setId(uuid);
    }
  }, [router.query]);


  const [copied, setCopied] = useState(false); // State for feedback
  
  const baseUrl = "https://www.htxshow.com/events/";
  const linkToCopy = `${baseUrl}${id}`;


  return (
    <Layout>

<div className="eventContainer">
      <h1>Thank You!</h1>
      {id && (
        <div className='thankyouContainer'>
          <p>Your event has been added to the list.</p>
          <p>Visit your event page here: <a className="eventLink" href={`/events/${id}`}>{baseUrl}{id}</a>.</p>
          <div className='copyIconContainer'>

          <FontAwesomeIcon
                icon={faCopy}
                className="copyLinkIcon"
                onClick={handleCopyLink}
                style={{ fontSize: "2em", color: "#FA2FB5", cursor: "pointer" }}
              />
              {copied ? <p style={{ color: '#FA2FB5' }}>Copied!</p> : <p className="copyLink" onClick={handleCopyLink}>Copy Link</p>}
          </div>

        </div>
      )}
    </div>
    </Layout>

  );
}
