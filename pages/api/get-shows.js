import { supabase } from '../../lib/supabase';

// Next.js API route handler
export default async function handler(req, res) {
  try {
    // Query to get all shows
    const { data, error } = await supabase.from('shows').select();

    if (error) {
      console.error('Error fetching shows:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const shows = data;

    console.log('shows in api', shows);

    // Send the shows data as a JSON response
    res.status(200).json(shows);
  } catch (error) {
    console.error('Error fetching shows:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
