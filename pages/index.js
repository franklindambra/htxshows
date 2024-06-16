import Head from 'next/head';
import Shows from '../components/Shows';


export const metadata = {
  title: 'Next.js',
}
 


export default function Home() {
  return (
<div>
<Head>

  <title>HTX Shows - Houstons Centralized Shows List</title>
  <meta name="description" content="The best website for finding shows in Houston Texas. Fitler by time, genre, AM or Pm." />
  <meta name="keywords" content="Houston, shows, events, music" />
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charSet="utf-8" />


  <meta property="og:site_name" content="HTX Show Listings" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content="HTX Show Listings" />
  <meta property="og:description" content="Browse upcoming shows in Houston, Texas." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.htxshow.com/" />
  <meta property="og:image" content="	https://www.htxshows.com/bgresized.jpg" />
  <meta property="og:image:alt" content="HTX Show Listings" />

</Head>

  
  <Shows /></div>
      

  );
}
