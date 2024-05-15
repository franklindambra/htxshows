const scrapeShowListings = require('./whiteOakMusicHall');
const fetch = require('node-fetch');

async function postObject(formDataForSubmission) {
    
    console.log('form data api call', formDataForSubmission);
    try {
        const res = await fetch("http://localhost:3000//api/post-show", {
            method: "POST",
            body: JSON.stringify({
                formDataForSubmission,
            }),
            headers: { "Content-Type": "application/json" },
        });
        
        const data = await res.json();
        console.log("Response from API:", data);
    } catch (error) {
        console.error("Error posting data to API:", error);
    }
}

async function runScraper() {
    const showListings = await scrapeShowListings();
    console.log(showListings);

    //const delayBetweenRequests = 1000; // Set the delay between requests (in milliseconds)

    for (let i = 0; i < showListings.length; i++) {
        const show = showListings[i];
        const formDataForSubmission = {
            
            eventTitle: show.title,
            contactName: "",
            contactEmail: "",
            bands: show.title,
            genre: "",
            detailsLink: "",
            venue: show.venue,
            month: show.month,
            day: show.monthDate,
            year: show.year,
            hour: "7",
            minute: "0",
            ampm: "PM",
            charge: "Yes",
            price: "",
            ageRestrictions: "All Ages",
            premium: "false",
            spotify: "",
            appleMusic: "",
            instagram: "",
            facebook: "",
            x: "",
            description: "",
        };

        //console.log(formDataForSubmission);

        // Post the formDataForSubmission to the API

        /*testing
        const formDataForSubmission = {
            eventTitle: "cool show",
            contactName: "g",
            contactEmail: "g",
            bands: "g",
            genre: "ambient",
            detailsLink: "https://www.test.com",
            venue: "this",
            month: "4",
            day: "4",
            year: "2025",
            hour: "3",
            minute: "3",
            ampm: "PM",
            charge: "No",
            price: "3",
            ageRestrictions: "All Ages",
            premium: "false",
            spotify: "https://www.test.com",
            appleMusic: "https://www.test.com",
            instagram: "https://www.test.com",
            facebook: "https://www.test.com",
            x: "https://www.test.com",
            description: "my description",
        };*/
        postObject(formDataForSubmission);

        // Add a delay between requests to avoid rate issues
    //await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
 }
}

runScraper();
