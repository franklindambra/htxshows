
import { useState } from 'react';
import PostShowForm from '../components/PostShowForm';
import Checkout from '../components/Checkout';
import Layout from '@/components/Layout';
import Head from 'next/head';


export default function PostShow() {

  const [formData, setFormData] = useState({
    eventTitle: "",
    contactName: "",
    contactEmail: "",
    bands: "",
    genre: "",
    detailsLink: "",
    venue: "",
    month: "",
    day: "",
    year: "",
    hour: "",
    minute: "",
    ampm: "PM",
    charge: "No",
    price: "",
    ageRestrictions: "All Ages",
    premium: "false",
    spotify: "",
    appleMusic: "",
    instagram: "",
    facebook: "",
    x: "",
    description: "",
  });

  //console.log('formData',formData);


  const [priceTotal, setPriceTotal] = useState('1');

  

  //console.log(priceTotal);




  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
  
      // Update priceTotal based on 'premium'
      setPriceTotal(updatedData.premium === "true" ? '2' : '1');
  
      return updatedData;
    });
  };
  


  return (

    <Layout>
            <Head>
        <title>HTX Shows - Post a Show</title>
        <meta name="description" content="Post your show for free to Houston's only central shows listings board." />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <script type="application/ld+json">
    {`
      {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "HTX Shows - Post a Houston Show",
        "description": "Post a Houston show."
      }
    `}
  </script>

      </Head>
      <div className="post-show-container">
      <div className='left'>
        <PostShowForm setPriceTotal={setPriceTotal} handleChange={handleChange} handleSubmit={handleSubmit} formData={formData}></PostShowForm></div>
      <div className='right'><Checkout priceTotal={priceTotal} formData={formData}></Checkout></div>

    </div></Layout>
  );
}
