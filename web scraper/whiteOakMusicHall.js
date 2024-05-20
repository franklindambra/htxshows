const axios = require('axios');
const cheerio = require('cheerio');

// Function to convert month string to integer
function monthStringToNumber(monthString) {
    const months = {
        'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
        'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
    };
    return months[monthString];
}

async function scrapeShowListings() {
    try {
        // Fetch HTML content of the target website
        const response = await axios.get('https://whiteoakmusichall.com/');
        const html = response.data;

        // Load HTML content into Cheerio
        const $ = cheerio.load(html);

        // Extract show listings
        const showListings = [];
        const currentYear = new Date().getFullYear().toString(); // Get current year as string

        $('.tw-section').each((index, element) => {
            const venue = "White Oak Music Hall";
            
            
            const anchorElement = $(element).find('.tw-name a');
            const url = anchorElement.attr('href'); // Get the href of the anchor tag

            const title = anchorElement.text().trim();
           
            const monthString = $(element).find('.tw-event-month').text().trim();

            const month = monthStringToNumber(monthString); // Convert month string to integer
            
            const monthDate = $(element).find('.tw-event-date-complete .tw-event-date').text().trim();
            const year = currentYear;

            const imageElement = $(element).find('.tw-image img');
            const imageUrl = imageElement.attr('src');

        
            showListings.push({ venue, url, title, month, monthDate, year, imageUrl }); // Convert month to string
        });
        
        
        return showListings;
        
    } catch (error) {
        console.error('Error scraping show listings:', error);
        return [];
    }
}


module.exports = scrapeShowListings;
