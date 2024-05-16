
import { useState } from 'react';
import PostShowForm from '../components/PostShowForm';
import Checkout from '../components/Checkout';
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


  const [priceTotal, setPriceTotal] = useState('0');

  

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
      setPriceTotal(updatedData.premium === "true" ? '2' : '0');
  
      return updatedData;
    });
  };
  


  return (

 <>
<Head>
  <title>Post a Show - HTX Shows</title>
  <meta name="description" content="Post your upcoming show on HTX Shows and reach a wider audience in Houston, Texas." />
  <meta name="keywords" content="Houston, shows, events, music, post a show" />
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charSet="utf-8" />

  <meta property="og:site_name" content="HTX Shows" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content="Post a Show - HTX Shows" />
  <meta property="og:description" content="Post your upcoming show on HTX Shows and reach a wider audience in Houston, Texas." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.htxshows.com/post-show" />
  <meta property="og:image" content="https://www.htxshows.com/bgresized.jpg" />
  <meta property="og:image:alt" content="HTX Shows - Post a Show" />
</Head>

      <div className="post-show-container">
      <div className='left'>
        <PostShowForm setPriceTotal={setPriceTotal} handleChange={handleChange} handleSubmit={handleSubmit} formData={formData}></PostShowForm></div>
      <div className='right'><Checkout priceTotal={priceTotal} formData={formData}></Checkout></div>

    </div></>
  );
}
