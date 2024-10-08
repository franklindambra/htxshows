import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import { supabase } from '../../lib/supabase';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const host = 'https://www.htxshows.com'

export default async function handler(req, res) {
  const { method, body } = req;
  const { formDataForSubmission } = body;
  const { eventTitle, contactName, contactEmail, bands, genre, detailsLink, venue, month, day, year, hour, minute, ampm, charge, price, ageRestrictions, premium, spotify, appleMusic, instagram, facebook, x, description } = formDataForSubmission;


  if (method === "POST") {
    try {
      const date = new Date().toISOString();

      // Generate a UUID
      const uuid = uuidv4();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "INV-" + date,
              },
              unit_amount: body?.amount * 100 || 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        cancel_url: `${host}/post-show`,
        success_url: `${host}/thank-you?uuid=${uuid}`,
      });


      console.log(session);

      res.status(200).json({ sessionId: session.id });



      const { data, error } = await supabase.from('shows').insert([
          {
              event_title: eventTitle,
              contact_name: contactName,
              contact_email: contactEmail,
              bands: bands,
              genre: genre,
              details_link: detailsLink,
              venue: venue,
              month: month,
              day: day,
              year: year,
              hour: hour,
              minute: minute,
              ampm: ampm,
              charge: charge,
              price: price,
              age_restrictions: ageRestrictions,
              premium: premium,
              spotify: spotify,
              apple_music: appleMusic,
              instagram: instagram,
              facebook: facebook,
              x: x,
              description: description,
              uuid_column: uuid
          }
      ]).select();

      if (error) {
          console.error("Error inserting show:", error.message);
          return res.status(500).json({ error: "Internal Server Error" });
      }

      const insertedId = data[0].uuid_column;

      res.status(200).json({ message: "Form data submitted directly.", id: insertedId });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    console.error("Invalid method:", method);
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
