const userTab = document.getElementById("user-tab")
const searchTab = document.getElementById("search-tab")
const weathercontainer = document.getElementById("weather-container")
const weatherInfo = document.getElementById("weather-information")
const loading = document.getElementById("loading")
const searchingArea = document.getElementById("searching-area")
const grantLocation = document.getElementById("grant-location")



const API_key = "d34bccc209e7c5d1df5279525d7a973c";
let currentTab = userTab;
currentTab.classList.add("current-bg");


// function switchTab(clickedTab) {
//     if (clickedTab != currentTab) {
//         currentTab.classList.remove("current-bg");
//         currentTab = clickedTab
//         currentTab.classList.add("current-bg")
//     }

//     if (!searchTab.classList.contains("active")) {
//         weatherInfo.classList.remove("active");
//         grantLocation.classList.remove("active");
//         searchingArea.classList.add("active");
//     } else {
//         searchingArea.classList.remove("active")
//         weatherInfo.classList.add("active");
//         getSessionStorage()
//     }

// }





userTab.addEventListener("click", () => {
    if(!weatherInfo.classList.contains("active")){

        weatherInfo.classList.add("active");
        userTab.classList.add("current-bg");
        searchTab.classList.remove("current-bg");
        searchingArea.classList.remove("active");
        // grantLocation.style.visibility="hidden";
        userTab.classList.remove("current-bg");

    }else{
        getSessionStorage()

    }
       

        
    



})

searchTab.addEventListener("click", () => {
    
    if(!searchingArea.classList.contains("active")){
        weatherInfo.classList.remove("active");
        userTab.classList.remove("current-bg");
        searchTab.classList.add("current-bg");
        grantLocation.style.visibility="hidden";
        searchingArea.classList.add("active");
        

    }else{

        getSessionStorage()
    }
 


})
    


function getSessionStorage() {
    let localCoordinate = sessionStorage.getItem(user - Cordinates)
    if (!localCoordinate){
        grantLocation.style.visibility="visible";
        // searchingArea.classList.remove("active");
        
    } else {

        const Coordinate = JSON.parse(localCoordinate)
        fetchUserWeatherInfo(Coordinate)

    }

    sessionStorage.setItem("user")
}




async function fetchUserWeatherInfo(Coordinates){

    const { lat, lon } = Coordinates
    grantLocation.style.visibility="hidden";
    loading.style.visibility ="visible"

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
        const data = await response.json();
         loading.style.visibility ="hidden"
        weatherInfo.classList.add("active");
        renderWeatherInfo(data)
        console.log(data)
    }
    catch (err) {
        loading.style.visibility ="visible"
        alert("invalid API", err)

    }


}


function renderWeatherInfo(weatherInfo) {
    const city = document.getElementById("city");
    const countryFlag = document.getElementById("country-flag")
    const desc = document.getElementById("desc");
    const temp = document.getElementById("temp")
    const windSpeed = document.getElementById("wind-speed")
    const humidity = document.getElementById("humidity")
    const cloud = document.getElementById("clouds")
    const background = document.getElementById("background")

    city.innerText = weatherInfo?.name;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    countryFlag.src = `http://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloud.innerText = weatherInfo?.clouds?.all;
    let clouds = weatherInfo?.clouds?.all;
    console.log(clouds)
    if(clouds > 98){

        background.style.backgroundImage = "url(images/pexels-chetanvlad-1529360.jpg)"
        background.style.color = " #fff"
        console.log("mnbjfb")

    
    }else if(clouds > 50){
        background.style.backgroundImage = "url(images/pexels-chris-f-38966-9242489.jpg)"
        background.style.color = " #fff"
        console.log("mnbjfb")

    }else if(clouds > 10){
        background.style.backgroundImage = "url(images/pexels-davidriano-975771.jpg)"
        background.style.color = " #fff"
        console.log("mnbjfb")

    }else if(clouds < 10){

        background.style.backgroundImage= "url(images/pexels-wdnet-96622.jpg)"
        background.style.color = " #fff"
        console.log("mnbjfb")

    }
}

function grantLocationAccess() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        alert("Geolocation is not supported by this browser")
    }
}

function showPosition(position) {
    let userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }

    sessionStorage.setItem("userCoordinates", JSON.stringify(userCoordinates))

    fetchUserWeatherInfo(userCoordinates)


}

const grantAccesbtn = document.getElementById("grant-access");
grantAccesbtn.addEventListener("click", grantLocationAccess)





const iconBtn = document.getElementById("icon-btn")
const searchCity = document.getElementById("search-city")

iconBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let cityName = searchCity.value
    if (cityName === "") {
        return;
    } else {
        fetchCityName(cityName)
        console.log(cityName)
    }
})


async function fetchCityName(city) {
    loading.style.visibility ="visible"
    weatherInfo.classList.remove("active");
    grantLocation.classList.remove("active");

    try {

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
        let data = await response.json()
         loading.style.visibility ="hidden"
        weatherInfo.classList.add("active");
        renderWeatherInfo(data)
        console.log(city)


    }
    catch (err) {
        console.loo(err, "weather API is not working ")
    }

}
