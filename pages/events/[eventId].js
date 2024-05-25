// Import Head component from next/head
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faSpotify, faApple, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const EventDetail = () => {

  const router = useRouter();
  const { eventId } = router.query;

  const baseUrl = "https://www.htxshows.com/events/";
  const linkToCopy = `${baseUrl}${eventId}`;

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false); // State for feedback

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        if (!eventId) return; // Exit early if eventId is not present

        // Make a request to your existing API endpoint to get all shows
        const response = await fetch('/api/get-shows');
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await response.json();

        // Find the event with the matching eventId
        const event = data.find(event => event.uuid_column === eventId);
        if (event) {
          setEventData(event);
          console.log('Event data:', event);
        } else {
          console.error('Event not found');
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
        setError('Error fetching event data');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToCopy);
    setCopied(true); // Set copied state to true
    // Reset copied state after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  return (
    <div>
      {/* Use Head component to set metadata */}
      <Head>
        {/* Set the title tag with eventData.event_title */}
        <title>{eventData && eventData.event_title}</title>
        <meta
          name="description"
          content="Browse shows happening in Houston, Texas."
        />
        <meta
          name="keywords"
          content="houston, events, shows, music"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />

        <meta property="og:title" content={eventData && eventData.event_title} />
        <meta property="og:description" content="Browse shows happening in Houston, Texas." />
        <meta property="og:image" content="https://www.htxshows.com/bgresized.jpg" />
        <meta property="og:url" content="https://www.htxshow.com/events/{eventId}" />
        <meta property="og:type" content="website" />

      </Head>

      <div className="eventContainer">
        {loading && <div className='spinnerContainer'><div className='spinner'></div></div>}
        {error && <p>Error: {error}</p>}
        {eventData && (
          <>
            <div className="eventHeader">
              <h1 className='glow'>{eventData.event_title}</h1>
              <h2>{eventData.bands}</h2>
            </div>
            <div className='mainDetails'>
              <h2><span className='pink'>Venue:</span> {eventData.venue}</h2>
              <h2><span className='pink'>Date:</span> {eventData.month} / {eventData.day} / {eventData.year}</h2>
              <h2><span className='pink'>Time:</span> {eventData.hour}:{eventData.minute.toString().padStart(2, '0')} {eventData.ampm}</h2>
              <p>Age Restrictions: {eventData.age_restrictions}</p>
              {eventData.genre && (
                <p>Genre: {eventData.genre}</p>
              )}
                          {eventData.details_link && (
              <p><a href={eventData.details_link} rel="nofollow" target="_blank">{eventData.details_link}</a></p>
            )}
            </div>

            {/* Add other event links */}
            {eventData.spotify && (
              <a href={eventData.spotify} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faSpotify} className="fab fa-spotify" style={{ fontSize: "2em", color: "#FA2FB5", marginRight: "20px" }} />
              </a>
            )}
            {/* Add other social media links */}
            {eventData.description && (
              <div className='descriptionPanel'><p>{eventData.description}</p></div>
            )}
            {/* Copy link functionality */}
            <FontAwesomeIcon
              icon={faCopy}
              className="copyLinkIcon"
              onClick={handleCopyLink}
              style={{ fontSize: "2em", color: "#FA2FB5", cursor: "pointer" }}
            />
            {copied ? <p style={{ color: '#FA2FB5' }}>Copied!</p> : <p className="copyLink" onClick={handleCopyLink}>Share Page</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
