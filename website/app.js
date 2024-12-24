/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '0f21e2084a8a11e8ac49960c4d6a3610&units=metric';

let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (!zipCode) {
        alert('Please enter a zip code!');
        return;
    }

    getWeatherData(baseUrl, zipCode, apiKey)
        .then(data => {
            if (data.cod !== 200) {
                alert(data.message);
                return;
            }
            const { temp } = data.main;
            return postData('/add', { temperature: temp, date: newDate, userResponse: feelings });
        })
        .then(updateUI)
        .catch(error => console.error('Error:', error));
}

/* Function to GET Web API Data */
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    const response = await fetch(`${baseUrl}${zipCode}&appid=${apiKey}`);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting weather data:', error);
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.error('Error posting data:', error);
    }
};

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}°C`;
        document.getElementById('content').innerHTML = `Feeling: ${data.userResponse}`;
    } catch (error) {
        console.error('Error updating UI:', error);
    }
};
