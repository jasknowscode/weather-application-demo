const form = document.querySelector('#search');
const input = document.querySelector('#search-input');
const results = document.querySelector('#results');

async function getWeather(location) {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/41.8057%2C-87.6031?unitGroup=us&key=YYNLFHCTTC9D4V5TJQTYC84LS&contentType=json';
    
    try {
        const response = await fetch(url);
        const weatherData = await response.json();
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await weatherData;
    } catch (err) {
        console.error("Weather fetch failed:", err);
        return null;
    }
};

async function render(data) {
    results.textContent = '';

    const heading = document.createElement('h2');
    heading.textContent = data.resolvedAddress;
    results.appendChild(heading);

    data.days.forEach(day => {
        const p = document.createElement('p');
        p.textContent = `${day.datetime}: ${day.tempmax}° / ${day.tempmin}° - ${day.conditions}`;
        results.appendChild(p);
    });
}

form.addEventListener('click', async (e) => {
    e.preventDefault();
    const dataSearch = await getWeather(input.value.trim());

    if (!dataSearch) {
        results.textContent = "Could not load weather. Try again.";
        return;
    }
    render(dataSearch);
});


