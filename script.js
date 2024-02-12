const GeoKey = '42480c214f75495281790585d7d60dbb';
async function getIP(){
    const resGeo = await fetch (`https://ipgeolocation.abstractapi.com/v1/?api_key=${GeoKey}`)
    const resultGeo = await resGeo.json();
    getInfo(resultGeo.city);
}
getIP()

const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "793394ae74177c8e1457a8c68340503a",
};

const input = document.querySelector("#input");
input.addEventListener("keypress", enter);
function enter(e) {
    if (e.key === "Enter") {
        getInfo(input.value);
        gsap.fromTo('#date, .temp-city-container, .extra-info', {
            opacity: 0
        }, {
            opacity: 1,
            duration: 2
        })
    }
}

async function getInfo(data) {
    const res = await fetch(
        `${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`
    );
    const result = await res.json();
    displayResult(result);
}

function displayResult(result) {
    let city = document.querySelector("#city");
    city.textContent = `${result.name}, ${result.sys.country}`;
    getOurDate();

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML =
        "Feels Like: " + `${Math.round(result.main.feels_like)}<span>°</span>`;

    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${result.weather[0].main}`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = "Wind: " + `${result.wind.speed}` + " km/h";

    backgroundImage(result);

    let variation = document.querySelector("#variation");
    variation.innerHTML =
        "Variation: min: " + `${Math.round(result.main.temp_min)}<span>°</span>` + " max: " + `${Math.round(result.main.temp_max)}<span>°</span>`;

    function getOurDate() {
        const myDate = new Date();
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        let day = days[myDate.getDay()];
        let todayDate = myDate.getDate();
        let month = months[myDate.getMonth()];
        let year = myDate.getFullYear();
        let showDate = document.querySelector("#date");
        showDate.textContent = `${day}` + " " + `${todayDate}` + " " + `${month}` + " " + `${year}`;
    }
    input.value = "";
}

function backgroundImage(result) {
    let weather = result.weather[0].main;

    if (weather === "Clear") {
        document.body.style.backgroundImage = "url('cloud-blue-sky.jpg')";
    }

    if (weather === "Clouds") {
        document.body.style.backgroundImage = "url('sky-covered-with-clouds.jpg')";
    }

if (weather === "Mist" || weather === "Smoke" || weather === "Haze" || weather === "Dust" || weather === "Fog" || weather === "Sand" || weather === "Ash" || weather === "Squall") {
    document.body.style.backgroundImage = "url('mist.jpg')";
}

    if (weather === "Tornado") {
        document.body.style.backgroundImage = "url('tornado.jpg')";
    }

    if (weather === "Snow") {
        document.body.style.backgroundImage = "url('winter-covered-snow.jpg')";
    }

    if (weather === "Rain") {
        document.body.style.backgroundImage = "url('rainy.jpg')";
    }

    if (weather === "Drizzle") {
        document.body.style.backgroundImage = "url('drizzle.jpg')";
    }

    if (weather === "Thunderstorm") {
        document.body.style.backgroundImage = "url('thunderstorm.jpg')";
    }
}
