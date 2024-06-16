const scrapeShowListings = require('./venues/whiteOakMusicHall');
const fetch = require('node-fetch');

let existingShowTitles = [];

async function getTitles() {
    try {
        const res = await fetch("http://localhost:3000/api/get-titles", {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        // Insert titles into existingShowTitles array
        data.forEach(item => {
            existingShowTitles.push(item.event_title);
        });

        // Uncomment for debugging
        console.log("Updated existingShowTitles array:", existingShowTitles);
    } catch (error) {
        console.error("Error fetching data from API:", error);
    }
}

async function postObject(formDataForSubmission) {
    // Uncomment for debugging
    //console.log('form data api call', formDataForSubmission);

    try {
        const res = await fetch("http://localhost:3000/api/post-show", {
            method: "POST",
            body: JSON.stringify(formDataForSubmission),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log("Response from API:", data);
    } catch (error) {
        console.error("Error posting data to API:", error);
    }
}

async function runScraper() {
    await getTitles(); // Ensure titles are fetched before scraping

    const showListings = await scrapeShowListings();
    console.log(showListings);

    for (let i = 0; i < showListings.length; i++) {
        const show = showListings[i];
        const formDataForSubmission = {
            eventTitle: show.title,
            contactName: "",
            contactEmail: "",
            bands: show.title,
            genre: "",
            detailsLink: show.url,
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
            image: show.imageUrl
        };

        // Check if the eventTitle is already in the existingShowTitles array
        if (existingShowTitles.includes(formDataForSubmission.eventTitle)) {
            console.log(`Skipping ${formDataForSubmission.eventTitle} as it already exists.`);
            continue;
        }

        //await postObject(formDataForSubmission);

        // Uncomment for rate limiting
        // await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
    }
}

runScraper();
