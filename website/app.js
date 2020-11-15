/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=ca61760f07c9ba12830734aaf877ada5';
const countrycode = ',us';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Button event listener
document.getElementById('generate').addEventListener('click', getInfo);

//API call
function getInfo(){
    const zipcode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    getWeatherData(baseURL, zipcode, countrycode, apiKey)
    .then(function(data){
        postData('/add', {date: newDate, temp: data.main.temp, content});
        updateUI();
    })
};

//GET request
const getWeatherData = async (baseURL, zipcode, countrycode, apiKey) => {
    const res = await fetch (baseURL+zipcode+countrycode+apiKey);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
};

//POST request
const postData = async (url = '', data = {date: data.date, temp: data.temp, content: data.content}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
};

//Update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.content;
  
    } catch(error){
      console.log('error', error);
    }
};