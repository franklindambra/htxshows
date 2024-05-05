import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);




const Checkout = (props) => {
  const router = useRouter();
  const amount = props.priceTotal
  const [isLoading, setIsLoading] = useState(false);

  const formDataForSubmission = props.formData;

  console.log('formDataForSubmission', formDataForSubmission)


  //console.log('price in checkout', props.priceTotal)

  const handler = async () => {

    const missingFields = [];
    if (!props.formData.eventTitle) missingFields.push("Event Title");
    if (!props.formData.bands) missingFields.push("Bands");
    if (!props.formData.venue) missingFields.push("Venue");
    if (!props.formData.month) missingFields.push("Month");
    if (!props.formData.day) missingFields.push("Day");
    if (!props.formData.year) missingFields.push("Year");
    if (!props.formData.hour) missingFields.push("Hour");
    if (!props.formData.minute) missingFields.push("Minute");
    if (!props.formData.contactName) missingFields.push("Contact Name");
    if (!props.formData.contactEmail) missingFields.push("Contact Email");

    if (missingFields.length > 0) {
      alert("Please fill out all required fields: " + missingFields.join(", "));
      return;
    } else {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(props.formData.contactEmail)) {
        alert("Please enter a valid email address.");
        return;
      }

        // Check if URLs include "https://"
        const urlFields = {
          appleMusic: "Apple Music",
          instagram: "Instagram",
          facebook: "Facebook",
          spotify: "Spotify",
          x: "X",
          detailsLink: "External Details Page"
      };

      for (const [field, title] of Object.entries(urlFields)) {
          const url = props.formData[field];
          if (url && !url.startsWith("https://")) {
              alert(`Please include "https://" in the ${title} URL.`);
              return;
          }
      }

      setIsLoading(true);

      if (amount > 0) {
        try {
          const stripe = await asyncStripe;
          const res = await fetch("/api/transaction-s", {
            method: "POST",
            body: JSON.stringify({
              formDataForSubmission,
              amount,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const { sessionId } = await res.json();
          const { error } = await stripe.redirectToCheckout({ sessionId });
          console.log(error);
          if (res.ok) {

            const data = await res.json(); // Extract data from the response

            const id = data.id; // Assuming the response contains a postId field

            // Redirect to the thank you page with the postId as a parameter
            router.push(`/thank-you?id=${id}`);
          } else {
            // Handle non-successful response (optional)
            router.push("/error");
          }
        } catch (err) {
          console.log(err);
          router.push("/error");
        }
      } else {
        console.log("formDataForSubmission in amnt 0 api call", formDataForSubmission);
        try {
          const res = await fetch("/api/post-show", {
            method: "POST",
            body: JSON.stringify({
              formDataForSubmission,
            }),
            headers: { "Content-Type": "application/json" },
          });

          // Check if the response is successful (status code 2xx)
          if (res.ok) {
            const data = await res.json(); // Extract data from the response
            console.log(data);
            const uuid = data.uuid;
            router.push(`/thank-you?uuid=${uuid}`);
          } else {
            // Handle non-successful response (optional)
            router.push("/error");
          }
        } catch (err) {
          console.log(err);
          router.push("/error");
        }

      }
    }
  }


  useEffect(() => {
    // Get the width of the parent element (.right)
    const rightWidth = document.querySelector('.right').offsetWidth;

    //console.log('right width', rightWidth);

    const sticky = document.querySelector('.sticky');
    sticky.style.width = (rightWidth) + 'px';

    // Optional: If the .right width changes dynamically, you can update the .sticky width accordingly
    const handleResize = () => {
      const updatedRightWidth = document.querySelector('.right').offsetWidth;
      sticky.style.width = (updatedRightWidth) + 'px';
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (

    <div className="sticky">

      <h2>Event Title: <span className="glow">{props.formData.eventTitle}</span></h2>
      <h2 >Band(s): <span className="glow">{props.formData.bands}</span></h2>
      <h2>Venue: <span className="glow">{props.formData.venue}</span> </h2>
      <h2>Date: <span className="glow">{props.formData.month} {props.formData.day} {props.formData.year}</span></h2>
      <h2>Time: <span className="glow">{props.formData.hour} {props.formData.minute} {props.formData.ampm}</span></h2>

      <div className="checkoutPanel">
        <h2 className="total">Total: ${props.priceTotal}</h2>
        <button
          onClick={handler}
          className="checkoutButton">
          {props.priceTotal > '0' ? 'Checkout' : 'Submit'}
        </button>

        {isLoading && <div className="spinner"></div>}


        <p className="subscript">By submitting this form you agree that you have read and accepted our <a target="_blank" href="/terms-of-service">Terms of Service</a>.
          Secure checkout with Stripe is implemented for all premium posts to ensure safe transactions. Please review your details carefully before submitting, as all submissions are considered final. On submission your show will be added to the home page list and your event page will created. The submitter holds full responsibility for all content provided. HTXSHOWS reserves the right to revoke submissions at its discretion. </p>

      </div>
    </div>



  );
};

export default Checkout;