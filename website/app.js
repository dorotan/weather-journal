
/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// Personal API Key for OpenWeatherMap API
let apiKey = 'ab2a39b9b63f8e0675d89a726e4aff99';
let baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`
let zipCode =  document.querySelector('#zip');

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    getZipCode(baseURL, zipCode.value, apiKey)
    .then(function(data) {
        let feelings = document.querySelector('#feelings').value;
        postData('/add', {
            date: newDate,
            temp: data.main.temp,
            userResponse: feelings,
        })
    })
    .then(
        updateUI()
    )
}

/* Function to GET Web API Data*/
const getZipCode = async (url, zip, key)=>{
  const response = await fetch(url+zip+ ",us&appid=" +key);
  try {
    const data = await response.json();
    return data;
  }  catch(error) {
  }
}

// Async POST
const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

const getData = async ( url = '') => {
    const request = await fetch(url, {
        method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    try {
      const newData = await request.json();
      return newData
    } catch(error) {
    console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const data = await request.json();
      document.querySelector('#temp').innerHTML = `Temperature: ${data[data.length - 1].temp}`;
      document.querySelector('#date').innerHTML = `Date: ${data[data.length - 1].date}`;
      document.querySelector('#content').innerHTML = `Response: ${data[data.length - 1].userResponse}`;

    }catch(error){
      console.log("error", error);
    }
  }
