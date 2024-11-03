'use strict';

const hourEL = document.getElementById('hour');
const minuteEL = document.getElementById('minutes');
const secondEL = document.getElementById('seconds');
const ampmEL = document.getElementById('ampm');

let backgrounds = [];

// Function to fetch background images from Unsplash API
async function fetchBackgrounds() {
    try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                query: 'nature',
                count: 10,
                client_id: 'JMuCtglB84YuzzCGB3BOpIkBPZj3-qt1Wh-EVe54eew'
            }
        });

        // Extract image URLs and populate backgrounds array
        backgrounds = response.data.map(image => `url(${image.urls.regular})`);
    } catch (error) {
        console.error("Error fetching backgrounds:", error);
    }
}

// Function to update background image every second
function updateBackground() {
    if (backgrounds.length === 0) return;
    const minutes = new Date().getMinutes();
    const index = minutes % backgrounds.length;
    document.body.style.backgroundImage = backgrounds[index];
}

function updateClock() {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hourEL.innerText = String(hour % 12 || 12).padStart(2, '0');
    minuteEL.innerText = String(minutes).padStart(2, '0');
    secondEL.innerText = String(seconds).padStart(2, '0');
    ampmEL.innerText = ampm;
}

// Initial fetch of backgrounds and set interval for clock and background updates
fetchBackgrounds().then(() => {
    setInterval(() => {
        updateClock();
        updateBackground();
    }, 1000);
});
