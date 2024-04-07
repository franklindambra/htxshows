import { supabase } from '../../lib/supabase';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library

export default async function handler(req, res) {
    const { method, body } = req;

    if (method === "POST") {
        const uuid = uuidv4();

        try {
            const { formDataForSubmission } = body;

            const { eventTitle, contactName, contactEmail, bands, genre, detailsLink, venue, month, day, year, hour, minute, ampm, charge, price, ageRestrictions, premium, spotify, appleMusic, instagram, facebook, x, description } = formDataForSubmission;


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

            console.log('data posted succesfully', data);

            const insertedId = data[0].uuid_column;

            console.log('inserted ID', insertedId);

            res.status(200).json({ message: "Form data submitted directly.", uuid: insertedId });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        console.error("Invalid method:", method);
        res.status(405).json({ error: "Method Not Allowed" });
    }
}

