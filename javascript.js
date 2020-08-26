window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section')
    let temperatureSectionSpan = document.querySelector('.degree-section span')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            // console.log(position);
            long = position.coords.longitude;
            // console.log(long);
            lat = position.coords.latitude;

            const api =`http://api.openweathermap.org/data/2.5/weather?lat=`+lat+`&lon=`+long+`&appid=d84b10c5dd1d3dedc2b94dfdc9de5f17
            `;
            //console.log(api);

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(response =>{
                console.log(response);
                const temperature = response.main.temp;
                // console.log(temperature);
                const description = response.weather[0].description.toUpperCase();
                // console.log(description);
                const timezone = response.name.toUpperCase()+" / "+response.sys.country.toUpperCase();
                // console.log(timezone);
                const icon =response.weather[0].icon;
                const iconurl= "http://openweathermap.org/img/w/" +icon+".png";
                //console.log(iconurl);

                //SET DOM ELEMENTS FROM API

                temperatureDegree.textContent=temperature;
                temperatureDescription.textContent=description;
                locationTimezone.textContent=timezone;
                document.getElementById("wicon").src=iconurl;

                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSectionSpan.textContent==="K"){
                        temperatureSectionSpan.textContent="C";
                        let degree = temperatureDegree.textContent;
                        degree = (degree-273);
                        //console.log(degree);
                        temperatureDegree.textContent=Math.floor(degree);
                    }
                    else{
                        temperatureSectionSpan.textContent="K";
                        temperatureDegree.textContent=temperature;
                    }
                })
               
            })

        });
        
        
    }

})