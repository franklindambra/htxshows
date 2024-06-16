import React, { useState } from 'react';

const PostShowForm = (props) => {

  const maxCharLimit = 1000;

  // Event handler for description input change
  const handleDescriptionChange = (event) => {
    const inputValue = event.target.value;

    // Check if the input exceeds the character limit
    if (inputValue.length <= maxCharLimit) {
      // Update the form data if within the limit
      props.handleChange(event);
    }
  };



  return (<div className="postShowFormContainer">

    <form className="postShowForm" onSubmit={props.handleSubmit}>
      {/* Event Title */}

      <h2>Show Details</h2>
      <p>Fields Marked <span className="required">*</span> Required</p>
      <hr></hr>




      <label className="half leftField">
        <p>Event Title <span className="required">*</span></p>
        <input type="text" name="eventTitle" value={props.formData.eventTitle} onChange={props.handleChange} required />
      </label>

      <label className="half rightField">
        <p>Bands (Comma Separated)<span className="required"> *</span></p>
        <input type="text" name="bands" value={props.formData.bands} onChange={props.handleChange} />
      </label>


      <label className="half leftField">
        <p>Venue<span className="required"> *</span></p>
        <input type="text" name="venue" value={props.formData.venue} onChange={props.handleChange} />
      </label>

      <label className="half rightField">
        <p>Date<span className="required"> *</span></p>

        <select className="timeSelect" name="month" value={props.formData.month} onChange={props.handleChange}>
          <option value="">Month</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select className="timeSelect" name="day" value={props.formData.day} onChange={props.handleChange}>
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day.toString().padStart(2, '0')}>
              {day.toString().padStart(2, '0')}
            </option>
          ))}
        </select>

        <select className="timeSelect" name="year" value={props.formData.year} onChange={props.handleChange}>
          <option value="">Year</option>
          {Array.from({ length: 2 }, (_, i) => new Date().getFullYear() + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      <label className="half leftField">
        <p>Time<span className="required"> *</span></p>
        <select className="timeSelect" name="hour" value={props.formData.hour} onChange={props.handleChange}>
          <option value="null">Hour</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        <select className="timeSelect" name="minute" value={props.formData.minute} onChange={props.handleChange}>
          <option value="null">Minute</option>
          {/* Add minute options (00-59) */}
          {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
            <option key={minute} value={minute.toString().padStart(2, '0')}>
              {minute.toString().padStart(2, '0')}
            </option>
          ))}
        </select>

        <select className="timeSelect" name="ampm" value={props.formData.ampm} onChange={props.handleChange}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </label>



      <label className="half rightField">
        <p>Genre</p>
        <select name="genre" value={props.formData.genre} onChange={props.handleChange}>
          <option value="">Select Genre</option>
          <option value="Alternative">Alternative</option>
          <option value="Ambient">Ambient</option>
          <option value="Blues">Blues</option>
          <option value="Classical">Classical</option>
          <option value="Comedy">Comedy</option>
          <option value="Country">Country</option>
          <option value="EDM">EDM</option>
          <option value="Electronic">Electronic</option>
          <option value="Hip-hop">Hip Hop</option>
          <option value="Jazz">Jazz</option>
          <option value="Pop">Pop</option>
          <option value="R&B">R&B</option>
          <option value="Rock">Rock</option>
          <option value="Reggae">Reggae</option>
          <option value="Metal">Metal</option>
          <option value="Punk">Punk</option>
          <option value="Folk">Folk</option>
          <option value="Indie">Indie</option>
        </select>
      </label>
      {/* Contact Name */}
      <label className="half leftField">
        <p>Contact Name<span className="required"> *</span></p>
        <input type="text" name="contactName" value={props.formData.contactName} onChange={props.handleChange} />
      </label>


      {/* Contact Email */}
      <label className="half rightField">
        <p>Contact Email<span className="required"> *</span></p>
        <input type="text" name="contactEmail" value={props.formData.contactEmail} onChange={props.handleChange} />
      </label>


      <label>
        <p>External Page</p>
        <p class="subscript">Examples: Ticket sales page, your band website or main social media page. Include https://</p>
        <input type="text" name="detailsLink" value={props.formData.detailsLink} onChange={props.handleChange} />
      </label>

      <label style={{borderRadius:"5px"}} className="premium premiumOption">
        <h3>Premium Post</h3>
        <p>Have your post stand out in the events list for only a dollar extra.</p>

        <input type="radio" id="premiumYes" name="premium" value="true" checked={props.formData.premium === "true"} onChange={props.handleChange} />
        <label for="premiumYes" className="radio-label">Yes</label>
        <input type="radio" id="premiumNo" name="premium" value="false" checked={props.formData.premium === "false"} onChange={props.handleChange} />
        <label for="premiumNo" className="radio-label" >No</label>


      </label>

      <label className="whole">
        <p>Description</p>
        <p class="subscript">Optional but recommended for your event page</p>
        <textarea
          className="whole"
          name="description"
          value={props.formData.description}
          onChange={handleDescriptionChange}
          rows={7}
          style={{ resize: "vertical" }}
        />
        <p>{`${props.formData.description.length} / ${maxCharLimit} characters`}</p>
      </label>








      <label className="half leftField">
        <p>Is there a charge or cover?</p>
        <select className='wideSelect' name="charge" value={props.formData.charge} onChange={props.handleChange}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </label>

      {props.formData.charge === 'Yes' && (
        <label className="half">
          <p>Charge or Cover Price<br></br></p>
          <input
            type="text"
            name="price"  // Change the name as needed
            value={props.formData.price}  // Make sure to handle the state for this input
            onChange={props.handleChange}
          />
        </label>)}

      <label className="half rightField">
        <p>Age Restrictions</p>
        <select className='wideSelect' name="ageRestrictions" value={props.formData.ageRestrictions} onChange={props.handleChange}>
          <option value="All Ages">All Ages</option>
          <option value="18+">18+</option>
          <option value="21+">21+</option>
        </select>
      </label>



      <h2 style={{ marginTop: '20px', marginBottom: '0px' }}>Social Media Links</h2>
      <p className='subscript'>Include https://</p>
      <hr></hr>

      <label className="half leftField">
        <p>Spotify</p>
        <input type="text" name="spotify" value={props.formData.spotify} onChange={props.handleChange} />
      </label>

      <label className="half rightField">
        <p>Apple Music</p>
        <input type="text" name="appleMusic" value={props.formData.appleMusic} onChange={props.handleChange} />
      </label>

      <label className="half leftField">
        <p>Instagram</p>
        <input type="text" name="instagram" value={props.formData.instagram} onChange={props.handleChange} />
      </label>

      <label className="half rightField">
        <p>Facebook</p>
        <input type="text" name="facebook" value={props.formData.facebook} onChange={props.handleChange} />
      </label>


      <label className="half leftField">
        <p>X</p>
        <input type="text" name="x" value={props.formData.x} onChange={props.handleChange} />
      </label>




    </form>

  </div>
  );
};

export default PostShowForm;
