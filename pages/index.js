import Head from 'next/head';
import Layout from '@/components/Layout';
import Shows from '../components/Shows';


export default function Home() {
  return (
    <Layout>
      <Head>
        
        
        <title>HTX Shows</title>
        <meta name="description" content="Explore Houston's vibrant entertainment scene with our comprehensive shows listing board. Discover the latest concerts, theater performances, art exhibitions, and cultural events happening across the city. Stay informed and entertained with up-to-date schedules, ticket information, and insider tips on must-see shows in Houston." />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <script type="application/ld+json">
    {`
      {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "HTX Shows",
        "description": "Explore Houston's vibrant entertainment scene with our comprehensive shows listing board. Discover the latest concerts, theater performances, art exhibitions, and cultural events happening across the city. Stay informed and entertained with up-to-date schedules, ticket information, and insider tips on must-see shows in Houston."
      }
    `}
  </script>

      </Head>
      <Shows />
    </Layout>
  );
}
