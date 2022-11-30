/* Global Variables */
const apiKey = 'f229d86c27fc4034826d8ce5bf836f47';

// start api call to openweathermap app when generate button is clicked  
document.getElementById('generate').addEventListener('click', () =>{
    
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

    // acquire zip code submitted by the user
    const zipCode = document.getElementById('zip').value;

    // acquire feelings submitted by the user
    const feelings = document.getElementById('feelings').value;

    // fetch weather data using zip code & api key from external api
    fetchData(zipCode, apiKey)
    
    //post data to server side  endpoint
    .then( sentData => postData('/addData', {temp: sentData.main.temp, date: newDate, userFeelings: feelings })
    //get data from app endpoint and update UI
    .then( retrieveData('/getData')) 
    )   
    
})

// async function used to get weather data from external api 
const fetchData = async (zip, key) => {
    try {
        const apiResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zip+'&appid='+key+'&units=metric')
        console.log(apiResponse)
        const apiData= await apiResponse.json();
        console.log(apiData);
        return apiData; 
    }
    catch(error) {
        console.log("error:",error);
    }
}

// post data function
const postData = async ( url = '', data = {})=>{

    try {
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),     
    })
    
    }
    catch(error) {
    console.log("error", error);
    }
}

// get data function and update ui
const retrieveData = async (url='') => {
    
    try {
        const appResponse = await fetch(url);
        console.log(appResponse)
        const appData= await appResponse.json();
        console.log(appData);
        document.getElementById('date').innerHTML = 'date is '+ appData.date;
        document.getElementById('temp').innerHTML = 'temperature is '+ appData.temp + ' c';
        document.getElementById('content').innerHTML = 'feeling ' + appData.userResponse;
    }
    catch(error) {
        console.log("error:",error);
    }
}


