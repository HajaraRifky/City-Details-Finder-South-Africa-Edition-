const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '73e764a598mshd3f2d991aa7faf6p1c4278jsnbad6858539eb',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

cityId = "";//creating a variable to store the city id
lantitudeValue = "";//variable to store latitue values 
longitudeValue = "";//variable to store longtitue values
myarray = []//array to store results from fetch

citynamefromdoc=document.getElementById("cityname")
citynamefromdoc.value=""
citynamefromdoc.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {

setTimeout(fetching, 2000);
}
});
//function to fetch the data
function fetching() {
	cityName =citynamefromdoc.value//requesting user input
	//getting the city details from the server 
	cityurl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&offset=0&namePrefix=' + cityName;
	fetch(cityurl, options)
		.then(myresults => myresults.json())
		.then((result) => {
			myarray = result;//once results are fetched, added to the array

			//for ever data in the array
			for (let index = 0; index < myarray.data.length; index++) {

				//if the cityname searched for is the same as the city name in the array then we get the wikiId of that city name
				if (cityName.toLowerCase() === myarray.data[index].name.toLowerCase()) {
					cityId = myarray.data[index].wikiDataId;
				}
			}

			//then we fetch all city details
			setTimeout(() => {
				urlforcitydetails = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/' + cityId;
				fetch(urlforcitydetails, options)
					.then(myresults => myresults.json())
					.then((result) => {
						console.log(result)
						documentcityname=document.getElementById("cityName");
						documentcityname.innerHTML="City Name: "+result.data.city;
						documentcityname=document.getElementById("country");
						documentcityname.innerHTML="Country: "+result.data.country;
						population=document.getElementById("population");
						population.innerHTML="Population: "+result.data.population;
						elevation=document.getElementById("elevation");
						elevation.innerHTML="Elevation: "+result.data.elevationMeters;
						latitude=document.getElementById("latitude");
						latitude.innerHTML="Latitude: "+result.data.latitude;
						longitude=document.getElementById("longitude");
						longitude.innerHTML="Longitude: "+result.data.longitude;
						
						//displaying the population and elevation as requested by the assignment
						lantitudeValue = result.data.latitude;//storing the values to use to find the weather
						longitudeValue = result.data.longitude;
					})
			}, 3000)

			//fetching weather information
			setTimeout(() => {
				const options = {
					method: 'GET',
					headers: {
						'X-RapidAPI-Key': '73e764a598mshd3f2d991aa7faf6p1c4278jsnbad6858539eb',
						'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
					}
				}
				//geting the weather for the particular city
				cityNamee = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${longitudeValue}&lat=${lantitudeValue}`
				fetch(cityNamee, options)
					.then(response => response.json())
					//displaying the current temperature
					.then(function(response){ 
					timezone=document.getElementById("timezones")
					timezone.innerHTML="The time zone is: "+response.data[response.data.length - 1].timezone
					temp=document.getElementById("temprature")
					temp.innerHTML="Current temprature is: "+response.data[response.data.length - 1].temp;
					sky=document.getElementById("sky");
					sky.innerHTML="Today weather shows: "+response.data[response.data.length - 1].weather.description
					
					//alert(`City Name: ${response.data[response.data.length - 1].city_name}\nCurrent temperature:${response.data[response.data.length - 1].temp}`)
					})
					.catch(err => console.error(err));
			}, 4000)
		}),
		(error) => {
			error = "error"
			console.log(error);
		}
}

