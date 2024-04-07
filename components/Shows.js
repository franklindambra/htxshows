import React, { useState, useEffect } from 'react';
import '../styles.css';
import Link from 'next/link';
import SEOcontent from './SEOcontent';
import { supabase } from '../lib/supabase'

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const today = new Date();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const { data } = await supabase.from('shows').select();
        if (data && data.length > 0) {
          console.log('data', data);
          setShows(data);
        }
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false); // Update loading state regardless of success or failure
      }
    };
    
    fetchShows();
  }, []);

  const middleColumnShows = shows.filter((show) => {
    const showDate = new Date(show.year, show.month - 1, show.day);
    return (
      (!selectedGenre || show.genre === selectedGenre) &&
      (!selectedTime || show.ampm === selectedTime) &&
      (!selectedCharge || show.charge === selectedCharge) &&
      showDate >= today
    );
  });

  const genres = [...new Set(shows.map((show) => show.genre))];
  const times = [...new Set(shows.map((show) => show.ampm))];
  const charge = [...new Set(shows.map((show) => show.charge))];

  const showsByWeekday = middleColumnShows.reduce((acc, show) => {
    const numericDate = show.day > 9 ? show.day : `0${show.day}`;
    const date = new Date(show.year, show.month - 1, show.day);
    const weekday = date.toDateString();
    acc[weekday] = acc[weekday] || [];
    acc[weekday].push({ ...show, formattedDate: `${weekday} the ${numericDate}` });
    return acc;
  }, {});

  // Sort the shows within each weekday
  Object.values(showsByWeekday).forEach((shows) => {
    shows.sort((a, b) => {
      const dateA = new Date(a.year, a.month - 1, a.day);
      const dateB = new Date(b.year, b.month - 1, b.day);
      return dateA - dateB;
    });
  });

  // Sort weekdays based on the entire date string
  const sortedWeekdays = Object.entries(showsByWeekday).sort(([a], [b]) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  return (

    <div>
      <div className='showsContainer'>
        {/* Loading spinner */}
        {loading && (
          <div className='spinnerContainer'>
            <div className='spinner'></div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="filter-bar">
          <label>
            <p>Genre{' '}</p>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All</option>
              {genres.filter(genre => genre !== "").map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>


          <label>
            <p>AM or PM{' '}</p>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">All</option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>

          <label>
            <p>Cover{' '}</p>
            <select
              value={selectedCharge}
              onChange={(e) => setSelectedCharge(e.target.value)}
            >
              <option value="">All</option>
              {charge.map((charge, index) => (
                <option key={index} value={charge}>
                  {charge}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Filtered Shows */}
        {sortedWeekdays.map(([weekday, shows]) => (
          <div className="weekdayContainer" key={weekday}>
            <h2 className="weekday">{weekday} </h2>
            <hr></hr>
            {shows.map((show, index) => (
              <Link key={index} href="/events/[eventId]" as={`/events/${show.uuid_column}`}>
                <div className={`show ${show.premium ? 'premium' : 'regular'}`}>
                  <h3 className="eventTitle">{show.event_title}</h3>
                  <h4>{show.bands}</h4>
                  <p className="listDetail"><b>Time:</b> {show.hour}:{show.minute.toString().padStart(2, '0')} {show.ampm}</p>
                  <p className="listDetail"><b>Venue:</b> {show.venue}</p>
                  <p className="listDetail"><b>Cover:</b> {show.charge}</p>
                  <p className="listDetail"><b>Genre:</b> {show.genre}</p>
                  <p style={{ display: 'block', marginTop: '15px' }}>Click to Read More ...</p>
                </div>

              </Link>
            ))}
          </div>
        ))}
      </div>
      {!loading && (
        <SEOcontent></SEOcontent>
      )}

    </div>
  );

};

export default Shows;
