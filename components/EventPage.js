import Link from 'next/link';

const EventPage = ({ eventData }) => {
  console.log('showData', eventData);

  return (
    <div className="eventContainer">
      <h1>{eventData.event_title}</h1>
      <p>Event ID: {eventData.eventId}</p>
      <p>{eventData.charge}</p>
      {/* Display other event details using eventData */}
    </div>
  );
};

export default EventPage;
