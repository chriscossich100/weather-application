

$(function(){


    $('#celsius').css('color', 'cyan');

    let unitOfMeasurement;
    if("unit" in localStorage){
        if(window.localStorage.getItem('unit') == "metric"){
            $('#celsius1').css('color', 'cyan'); 
            unitOfMeasurement = 'metric';  
        }
        else{
            $('#fahrenheit1').css('color', 'cyan');
            unitOfMeasurement = 'imperial'; 
        }
    }
    else{
        $('#celsius1').css('color', 'cyan');
        unitOfMeasurement = 'metric';  
    }
    
    const apiKey = "Your Api Key Goes Here";
    var weatherDataContentText = $('.weatherDataContent');
    var inputedCity = '';
    let city;
    var start = '';
    var avgMorningTempurature = 0;
    var avgAfternoonTemperature = 0;
    var avgEveningTemperature = 0;
    var avgNighttemperature = 0;
    var date = new Date();
    let addorremoveError = false;

    if("cityName" in localStorage){
        console.log("the cities names are: " + window.localStorage.getItem('cityName'));
        var characters = JSON.parse(window.localStorage.getItem('cityName'));
        console.log('line 97\'s value is: ' + characters);
        var cities = []
        for(i = 0; i < characters.length; i++){
            cities.push(characters[i]);
            
        }
        console.log('the cities that are stored already are: ' + cities);
        // console.log("the cities stored in the local storage are: " + window.localStorage.getItem('cityName'));
    }
    else{
        var cities = []; 
        console.log("the cities stored are: " + window.localStorage.getItem('cityName'));
    }
    
    date = new Date();
    console.log(weatherDataContentText);


    $('#jameson').on('submit', getWeatherInfo);



    if(window.localStorage.getItem('searchedCity')){
        console.log('we do get here by the way');
        getWeatherInfo();
    }


    function getWeatherInfo(){


        if(window.localStorage.getItem('searchedCity') && !$('#cityIdGetter').val()){
            console.log('hoorah it matches b');
            city = window.localStorage.getItem('searchedCity');
            console.log(inputedCity);
        }
        else{
            city = $('#cityIdGetter').val();
            // city = window.localStorage.setItem('searchedCity' , city);
            
        }
        
        /* This is a shorthand Ajax function, which is equivalent to: REMEMBER THAT THE DEFAULT TYPE IS GET.
                $.ajax({
                url: url,
                data: data,
                success: success, //success handles the responces. so it could look like this: success: function(result){...}
                dataType: dataType
                });
        */

        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitOfMeasurement}&appid=${apiKey}`, function(data, status){
            
        
            // $('.quickNav').hide().slideDown();;
            // $('#hourlyHolder').css('display', 'block');
                
            console.log(data);
            console.log(data.main.temp_max + ',' + data.main.temp_min);

            start += '<div class = "weatherDataDiv"><h1 class = "cityName">' + data.name + '</h1>';
                var characterDate = date.toDateString();
                console.log(characterDate);
                start += '<div class = "asOfTime" id = "asOfTime1">as of ' + characterDate + '</div>';
                    start += '<div class = "tempInfoData">';
                        
                        start += '<div class = "tempandMainData"><span class = "temp">' + Math.floor(data.main.temp) + '°</span>';
                            start += '<div class = "weatherState">' + data.weather[0].main + '</div>';
                        start += '</div>';    
                    
                        start += '<div class = "iconandLowMin">';

                        switch(data.weather[0].main){
                            case 'Sunny':
                            case 'Clear':
                                start += '<svg viewBox="2050 -845 262 262"><circle cx="131" cy="131" r="131" fill="#ffde17" data-name="Sun Icon" transform="translate(2050 -845)"/></svg>';
                                break;
                            case 'Clouds':
                                start += '<svg viewBox="2436.9 -843.1 275.5 274.1"><g data-name="cloudy icon" transform="translate(84 790)"><circle cx="137" cy="137" r="137" fill="#fff" data-name="Ellipse 23" transform="translate(2354 -1633)"/><path fill="#ffde17"d="M2523.4-1361.5a37.2 37.2 0 0 0 8.4-23.4c0-22-19.8-40-44.1-40l-3.4.1h-.5a39.8 39.8 0 0 0-39.4-33.7 40.1 40.1 0 0 0-10 1.2 40 40 0 0 0-35.2-21.2 40.1 40.1 0 0 0-38.5 29 137.4 137.4 0 0 1-7.8-45.8 138.8 138.8 0 0 1 2.8-27.8 137 137 0 0 1 8-25.8 137.8 137.8 0 0 1 12.7-23.4 138.8 138.8 0 0 1 16.8-20.4 138.8 138.8 0 0 1 20.4-16.9 137.8 137.8 0 0 1 23.4-12.7 137 137 0 0 1 25.9-8 138.8 138.8 0 0 1 27.7-2.8 138.8 138.8 0 0 1 27.8 2.8 137 137 0 0 1 25.9 8 137.8 137.8 0 0 1 23.4 12.7 138.8 138.8 0 0 1 20.4 16.9 138.7 138.7 0 0 1 16.8 20.4 137.8 137.8 0 0 1 12.7 23.4 137 137 0 0 1 8 25.8 138.8 138.8 0 0 1 2.8 27.8 137.4 137.4 0 0 1-8 46.1 137.2 137.2 0 0 1-21.9 39.6 138.2 138.2 0 0 1-33.2 30.1 136.8 136.8 0 0 1-41.9 18z"data-name="Subtraction 1"/> </g></svg>';
                                break;
                            case 'Rain':
                            case 'Drizzle':
                            case 'Mist':
                                start += '<svg class = "rainChecker" viewBox="3170 -843.1 163.5 242.7"><g data-name="Rain Icon"><g data-name="Water Drops"><path fill="#0032cc" d="M3295.4-824.5s85.8 133.5 0 133.5 0-133.5 0-133.5z" data-name="Path 7"/><path fill="#003eff" d="M3239.4-843s-156.1 242.6 0 242.6 0-242.7 0-242.7z" data-name="Path 3"/></g></g></svg>';
                                break;
                            case 'Haze':
                            case 'Fog':
                            case 'Smoke':
                                start += '<svg viewBox="0 0 454 366"><path fill="#12bcff"d="M340 110c-40 0-75-14-110-26-30-11-61-21-92-27-35-6-65 6-89 34a28 28 0 0 1-40 3C-3 83-3 66 8 54 53 1 110-9 174 7c36 9 71 25 106 36 19 5 39 10 58 11 27 2 48-13 65-33 12-13 29-15 41-5s13 28 1 41c-28 33-63 53-105 53zM120 312c-27-1-51 11-70 34-11 13-29 15-41 4-12-10-12-28-1-40 45-53 103-63 167-47 37 10 72 25 108 36 18 6 37 10 55 11 27 2 47-12 64-32 8-9 17-15 30-12 21 4 29 28 16 45-37 45-85 65-143 51-34-8-66-21-99-32-27-9-53-18-86-18zM123 128c42 1 81 15 120 29 26 9 52 18 79 24 28 6 53-3 74-24l11-11c11-11 27-11 39-1 10 10 11 26 1 38-35 43-81 64-137 52-34-7-67-20-100-32-29-10-59-20-91-19-28 1-51 13-69 34-12 13-29 15-41 4s-12-28 0-41c30-35 68-52 114-53z"/></svg>';
                                break;
                            case 'Storm':
                            case 'Thunderstorm':
                                start += '<svg viewBox="3487.9 -810.7 291.2 200.3"><g data-name="Strom icon" transform="translate(1959 -1260.7)"><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 14" rx="55.3" ry="51.7"transform="translate(1529 490.4)"/> <ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 15" rx="55.3" ry="51.7"transform="translate(1569.6 467.8)"/><circle cx="55.3" cy="55.3" r="55.3" class="cls-99" data-name="Ellipse 16"transform="translate(1618.9 476.8)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 17" rx="55.3" ry="51.7"transform="translate(1631.8 450)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 18" rx="55.3" ry="51.7"transform="translate(1687.1 477.5)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 19" rx="55.3" ry="51.7"transform="translate(1709.6 507.3)"/><circle cx="55.3" cy="55.3" r="55.3" class="cls-99" data-name="Ellipse 20"transform="translate(1639.6 500.1)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 21" rx="55.3" ry="51.7"transform="translate(1569.6 507.3)"/><path fill="none" stroke="#fd0" stroke-width="18"d="M1732.5 644l-61.4-61.4 22.5-10.3 26.8 5.1 9.5-22.4-38-37.2" data-name="Path 59"/><path fill="none" stroke="#fd0" stroke-width="15" d="M1597.2 539.5l31.2 25.9-24.8 22.2 17.3 36.2"data-name="Path 60"/></g></svg>';
                                break;
                            case 'Snow':
                                start += '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.75 19.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm2 2.5c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm4.094 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm3.906 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm4.25-9.028c0 2.362-1.949 4.278-4.355 4.278h-10.291c-1.55 0-2.902-.802-3.674-2h-1.326c-2.405 0-4.354-1.916-4.354-4.278 0-2.101 1.545-3.847 3.578-4.206.168-3.073 2.75-5.516 5.922-5.516 1.797 0 3.403.785 4.49 2.024 3.4-.286 6.254 2.259 6.432 5.491 2.033.36 3.578 2.106 3.578 4.207zm-12.21-9.077c-.576-.395-1.323-.645-2.29-.645-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.257 1.057 2.278 2.354 2.278h.674c-.146-2.357 1.528-4.127 3.551-4.484.115-2.126 1.388-3.95 3.211-4.871zm3.711 6.855l1.499-.881-.521-.867-1.479.881v-1.633h-1v1.633l-1.494-.896-.506.867 1.499.896-1.499.865.537.867 1.463-.865v1.633h1v-1.633l1.467.869.533-.867-1.499-.869z"/></svg>';
                                break;
                        }
                        // start += '<svg class = "svgIcon" viewBox="0 0 454 366"><path fill="#12bcff"d="M340 110c-40 0-75-14-110-26-30-11-61-21-92-27-35-6-65 6-89 34a28 28 0 0 1-40 3C-3 83-3 66 8 54 53 1 110-9 174 7c36 9 71 25 106 36 19 5 39 10 58 11 27 2 48-13 65-33 12-13 29-15 41-5s13 28 1 41c-28 33-63 53-105 53zM120 312c-27-1-51 11-70 34-11 13-29 15-41 4-12-10-12-28-1-40 45-53 103-63 167-47 37 10 72 25 108 36 18 6 37 10 55 11 27 2 47-12 64-32 8-9 17-15 30-12 21 4 29 28 16 45-37 45-85 65-143 51-34-8-66-21-99-32-27-9-53-18-86-18zM123 128c42 1 81 15 120 29 26 9 52 18 79 24 28 6 53-3 74-24l11-11c11-11 27-11 39-1 10 10 11 26 1 38-35 43-81 64-137 52-34-7-67-20-100-32-29-10-59-20-91-19-28 1-51 13-69 34-12 13-29 15-41 4s-12-28 0-41c30-35 68-52 114-53z"/></svg>'
                        start += '<div class = "lowMin">' + Math.floor(data.main.temp_max) + '°/' + Math.floor(data.main.temp_min) + '°</div>'

                    start += '</div>';
                start+= '</div>';    

            // start += '<div><span class = "temp">' + Math.floor(data.main.temp) + '</span></div>';
            start += '</div>';
            
            
            // $('.weatherDataContent').html('<div class = "weatherDataDiv"><h1 class = "cityName">' + city + '</h1>as of<span class = temp>' + Math.floor(data.main.temp) + '</span>'
            // + '<p>' + data.coord.lon + ' - ' + data.coord.lat + '</p></div>');
        })
        .then(data =>{
            var longitude = data.coord.lon;
            var latitude = data.coord.lat;

            $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${unitOfMeasurement}&appid=${apiKey}`, function(data2, status){

                
                console.log(data2);
                console.log(data2.daily[0].temp.min + ', max: ' + data2.daily[0].temp.max);
                //calculate the average temperatures for morning, afternoon, evening, and overnight.
                for(i = 0; i < 4; i++){
                    avgNighttemperature += data2.hourly[i].temp;
                }
                

                for(i = 5; i < 12; i++){
                    avgMorningTempurature += data2.hourly[i].temp;
                }
                avgMorningTempurature = avgMorningTempurature / 7;

                for(i = 12; i < 16; i++){
                    avgAfternoonTemperature += data2.hourly[i].temp;
                }
                avgAfternoonTemperature = avgAfternoonTemperature / 4;

                for(i = 17; i < 21; i++){
                    avgEveningTemperature += data2.hourly[i].temp;
                }
                avgEveningTemperature = avgEveningTemperature / 4;

                for(i = 22; i <= 24; i++ ){
                    avgNighttemperature += data2.hourly[i].temp;
                }
                avgNighttemperature = avgNighttemperature / 7;

                console.log(data2.hourly);
                console.log(data2.hourly[8].weather[0].main);
                start += '<div class = "forecast">';
                    start += '<header><h2>Today\'s Forecast for ' + data.name + '</h2></header>';
                    start += '<div class = "hourlyInfo1">'
                        start += '<ul>';

                            start += '<li><div class = "hourlyForecastHolder1">';
                                start += '<h3><span>Morning</span></h3><div><span>' + Math.floor(avgMorningTempurature) + '°</span></div>';
                                start += '<svg viewBox="2436.9 -843.1 275.5 274.1"><g data-name="cloudy icon" transform="translate(84 790)"><circle cx="137" cy="137" r="137" fill="#fff" data-name="Ellipse 23" transform="translate(2354 -1633)"/><path fill="#ffde17"d="M2523.4-1361.5a37.2 37.2 0 0 0 8.4-23.4c0-22-19.8-40-44.1-40l-3.4.1h-.5a39.8 39.8 0 0 0-39.4-33.7 40.1 40.1 0 0 0-10 1.2 40 40 0 0 0-35.2-21.2 40.1 40.1 0 0 0-38.5 29 137.4 137.4 0 0 1-7.8-45.8 138.8 138.8 0 0 1 2.8-27.8 137 137 0 0 1 8-25.8 137.8 137.8 0 0 1 12.7-23.4 138.8 138.8 0 0 1 16.8-20.4 138.8 138.8 0 0 1 20.4-16.9 137.8 137.8 0 0 1 23.4-12.7 137 137 0 0 1 25.9-8 138.8 138.8 0 0 1 27.7-2.8 138.8 138.8 0 0 1 27.8 2.8 137 137 0 0 1 25.9 8 137.8 137.8 0 0 1 23.4 12.7 138.8 138.8 0 0 1 20.4 16.9 138.7 138.7 0 0 1 16.8 20.4 137.8 137.8 0 0 1 12.7 23.4 137 137 0 0 1 8 25.8 138.8 138.8 0 0 1 2.8 27.8 137.4 137.4 0 0 1-8 46.1 137.2 137.2 0 0 1-21.9 39.6 138.2 138.2 0 0 1-33.2 30.1 136.8 136.8 0 0 1-41.9 18z"data-name="Subtraction 1"/> </g></svg>';
            
                            start += '</div></li>';

                            start += '<li><div class = "hourlyForecastHolder1">';
                                start += '<h3><span>Noon</span></h3><div><span>' + Math.floor(avgAfternoonTemperature) + '°</span></div>';
                                start += '<svg viewBox="2436.9 -843.1 275.5 274.1"><g data-name="cloudy icon" transform="translate(84 790)"><circle cx="137" cy="137" r="137" fill="#fff" data-name="Ellipse 23" transform="translate(2354 -1633)"/><path fill="#ffde17"d="M2523.4-1361.5a37.2 37.2 0 0 0 8.4-23.4c0-22-19.8-40-44.1-40l-3.4.1h-.5a39.8 39.8 0 0 0-39.4-33.7 40.1 40.1 0 0 0-10 1.2 40 40 0 0 0-35.2-21.2 40.1 40.1 0 0 0-38.5 29 137.4 137.4 0 0 1-7.8-45.8 138.8 138.8 0 0 1 2.8-27.8 137 137 0 0 1 8-25.8 137.8 137.8 0 0 1 12.7-23.4 138.8 138.8 0 0 1 16.8-20.4 138.8 138.8 0 0 1 20.4-16.9 137.8 137.8 0 0 1 23.4-12.7 137 137 0 0 1 25.9-8 138.8 138.8 0 0 1 27.7-2.8 138.8 138.8 0 0 1 27.8 2.8 137 137 0 0 1 25.9 8 137.8 137.8 0 0 1 23.4 12.7 138.8 138.8 0 0 1 20.4 16.9 138.7 138.7 0 0 1 16.8 20.4 137.8 137.8 0 0 1 12.7 23.4 137 137 0 0 1 8 25.8 138.8 138.8 0 0 1 2.8 27.8 137.4 137.4 0 0 1-8 46.1 137.2 137.2 0 0 1-21.9 39.6 138.2 138.2 0 0 1-33.2 30.1 136.8 136.8 0 0 1-41.9 18z"data-name="Subtraction 1"/> </g></svg>';
            
                            start += '</div></li>';

                            start += '<li><div class = "hourlyForecastHolder1">';
                                start += '<h3><span>Evening</span></h3><div><span>' + Math.floor(avgEveningTemperature) + '°</span></div>';
                                start += '<svg viewBox="2436.9 -843.1 275.5 274.1"><g data-name="cloudy icon" transform="translate(84 790)"><circle cx="137" cy="137" r="137" fill="#fff" data-name="Ellipse 23" transform="translate(2354 -1633)"/><path fill="#ffde17"d="M2523.4-1361.5a37.2 37.2 0 0 0 8.4-23.4c0-22-19.8-40-44.1-40l-3.4.1h-.5a39.8 39.8 0 0 0-39.4-33.7 40.1 40.1 0 0 0-10 1.2 40 40 0 0 0-35.2-21.2 40.1 40.1 0 0 0-38.5 29 137.4 137.4 0 0 1-7.8-45.8 138.8 138.8 0 0 1 2.8-27.8 137 137 0 0 1 8-25.8 137.8 137.8 0 0 1 12.7-23.4 138.8 138.8 0 0 1 16.8-20.4 138.8 138.8 0 0 1 20.4-16.9 137.8 137.8 0 0 1 23.4-12.7 137 137 0 0 1 25.9-8 138.8 138.8 0 0 1 27.7-2.8 138.8 138.8 0 0 1 27.8 2.8 137 137 0 0 1 25.9 8 137.8 137.8 0 0 1 23.4 12.7 138.8 138.8 0 0 1 20.4 16.9 138.7 138.7 0 0 1 16.8 20.4 137.8 137.8 0 0 1 12.7 23.4 137 137 0 0 1 8 25.8 138.8 138.8 0 0 1 2.8 27.8 137.4 137.4 0 0 1-8 46.1 137.2 137.2 0 0 1-21.9 39.6 138.2 138.2 0 0 1-33.2 30.1 136.8 136.8 0 0 1-41.9 18z"data-name="Subtraction 1"/> </g></svg>';
            
                            start += '</div></li>';

                            start += '<li><div class = "hourlyForecastHolder1">';
                                start += '<h3><span>Night</span></h3><div><span>' + Math.floor(avgNighttemperature) + '°</span></div>';
                                start += '<svg viewBox="2436.9 -843.1 275.5 274.1"><g data-name="cloudy icon" transform="translate(84 790)"><circle cx="137" cy="137" r="137" fill="#fff" data-name="Ellipse 23" transform="translate(2354 -1633)"/><path fill="#ffde17"d="M2523.4-1361.5a37.2 37.2 0 0 0 8.4-23.4c0-22-19.8-40-44.1-40l-3.4.1h-.5a39.8 39.8 0 0 0-39.4-33.7 40.1 40.1 0 0 0-10 1.2 40 40 0 0 0-35.2-21.2 40.1 40.1 0 0 0-38.5 29 137.4 137.4 0 0 1-7.8-45.8 138.8 138.8 0 0 1 2.8-27.8 137 137 0 0 1 8-25.8 137.8 137.8 0 0 1 12.7-23.4 138.8 138.8 0 0 1 16.8-20.4 138.8 138.8 0 0 1 20.4-16.9 137.8 137.8 0 0 1 23.4-12.7 137 137 0 0 1 25.9-8 138.8 138.8 0 0 1 27.7-2.8 138.8 138.8 0 0 1 27.8 2.8 137 137 0 0 1 25.9 8 137.8 137.8 0 0 1 23.4 12.7 138.8 138.8 0 0 1 20.4 16.9 138.7 138.7 0 0 1 16.8 20.4 137.8 137.8 0 0 1 12.7 23.4 137 137 0 0 1 8 25.8 138.8 138.8 0 0 1 2.8 27.8 137.4 137.4 0 0 1-8 46.1 137.2 137.2 0 0 1-21.9 39.6 138.2 138.2 0 0 1-33.2 30.1 136.8 136.8 0 0 1-41.9 18z"data-name="Subtraction 1"/> </g></svg>';
            
                            start += '</div></li>';

                        start += '</ul>';
                    start += '</div>';
                    
                start += '</div>';

                start +='<div class = "weatherDetails">'
                    start += '<header><h2>Weather Details in ' + data.name + '</h2></header>';
                    start += '<span class = "feelsLike">' + Math.floor(data2.current.feels_like) + '°</span><div class = "feelsLikeText">feels like</div>';
                    start += '<div class ="details">';
                        start += '<div class = "leftDetails"><div class = "leftDescription">High and Low</div><div class = "leftApiData"><span>'+Math.floor(data2.daily[0].temp.max) + '°/' + Math.floor(data2.daily[0].temp.min) + '°  </span></div></div>';
                        start += '<div class = "rightDetails"><div class = "rightDescription">Wind</div><div class = "rightApiData"><span>'+ data2.daily[0].wind_speed + ' km/h</span></div></div>';
                        start += '<div class = "leftDetails"><div class = "leftDescription">Humidity</div><div class = "leftApiData"><span>'+ data2.current.humidity + '%</span></div></div>';
                        start += '<div class = "rightDetails"><div class = "rightDescription">Dew Point</div><div class = "rightApiData"><span>'+ Math.floor(data2.daily[0].dew_point) + '°</span></div></div>';
                        start += '<div class = "leftDetails"><div class = "leftDescription">Pressure</div><div class = "leftApiData"><span>'+ data2.daily[0].pressure + 'mb</span></div></div>';
                        start += '<div class = "rightDetails"><div class = "rightDescription">UV Index</div><div class = "rightApiData"><span>'+ data2.current.uvi + ' of 11</span></div></div>';
                    start += '</div>';
                start += '</div>';

                start += '<div class = "hourlyDetails">'

                    start += '<header><h2>Hourly Forecast</h2></header>';
                    start += '<div class = "hourlyInfo">'
                        start += '<ul>';


                            let getHourst = new Date();

                            let charHours = getHourst.getHours();
                            let hourlyHour = 0;
                            let svgStringer = '';

                            for(i = 0; i < 5; i++){


                                switch(data2.hourly[hourlyHour].weather[0].main){
                                    case 'Sunny':
                                    case 'Clear':
                                        svgStringer += '<svg viewBox="2050 -845 262 262"><circle cx="131" cy="131" r="131" fill="#ffde17" data-name="Sun Icon" transform="translate(2050 -845)"/></svg>';
                                        break;
                                    case 'Clouds':
                                        svgStringer += '<svg viewBox="2436.9 -843.1 275.5 274.1"><g data-name="cloudy icon" transform="translate(84 790)"><circle cx="137" cy="137" r="137" fill="#fff" data-name="Ellipse 23" transform="translate(2354 -1633)"/><path fill="#ffde17"d="M2523.4-1361.5a37.2 37.2 0 0 0 8.4-23.4c0-22-19.8-40-44.1-40l-3.4.1h-.5a39.8 39.8 0 0 0-39.4-33.7 40.1 40.1 0 0 0-10 1.2 40 40 0 0 0-35.2-21.2 40.1 40.1 0 0 0-38.5 29 137.4 137.4 0 0 1-7.8-45.8 138.8 138.8 0 0 1 2.8-27.8 137 137 0 0 1 8-25.8 137.8 137.8 0 0 1 12.7-23.4 138.8 138.8 0 0 1 16.8-20.4 138.8 138.8 0 0 1 20.4-16.9 137.8 137.8 0 0 1 23.4-12.7 137 137 0 0 1 25.9-8 138.8 138.8 0 0 1 27.7-2.8 138.8 138.8 0 0 1 27.8 2.8 137 137 0 0 1 25.9 8 137.8 137.8 0 0 1 23.4 12.7 138.8 138.8 0 0 1 20.4 16.9 138.7 138.7 0 0 1 16.8 20.4 137.8 137.8 0 0 1 12.7 23.4 137 137 0 0 1 8 25.8 138.8 138.8 0 0 1 2.8 27.8 137.4 137.4 0 0 1-8 46.1 137.2 137.2 0 0 1-21.9 39.6 138.2 138.2 0 0 1-33.2 30.1 136.8 136.8 0 0 1-41.9 18z"data-name="Subtraction 1"/> </g></svg>';
                                        break;
                                    case 'Rain':
                                    case 'Drizzle':
                                    case 'Mist':
                                        svgStringer += '<svg class="rainChecker Icon--icon--2AbGu Icon--actionTheme--2vSlg DetailsTable--icon--34dUa" theme="action" set="current-conditions" name="humidity" data-testid="Icon" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4"></path></svg>';
                                        break;
                                    case 'Haze':
                                    case 'Fog':
                                    case 'Smoke':
                                        svgStringer += '<svg viewBox="0 0 454 366"><path fill="#12bcff"d="M340 110c-40 0-75-14-110-26-30-11-61-21-92-27-35-6-65 6-89 34a28 28 0 0 1-40 3C-3 83-3 66 8 54 53 1 110-9 174 7c36 9 71 25 106 36 19 5 39 10 58 11 27 2 48-13 65-33 12-13 29-15 41-5s13 28 1 41c-28 33-63 53-105 53zM120 312c-27-1-51 11-70 34-11 13-29 15-41 4-12-10-12-28-1-40 45-53 103-63 167-47 37 10 72 25 108 36 18 6 37 10 55 11 27 2 47-12 64-32 8-9 17-15 30-12 21 4 29 28 16 45-37 45-85 65-143 51-34-8-66-21-99-32-27-9-53-18-86-18zM123 128c42 1 81 15 120 29 26 9 52 18 79 24 28 6 53-3 74-24l11-11c11-11 27-11 39-1 10 10 11 26 1 38-35 43-81 64-137 52-34-7-67-20-100-32-29-10-59-20-91-19-28 1-51 13-69 34-12 13-29 15-41 4s-12-28 0-41c30-35 68-52 114-53z"/></svg>';
                                        break;
                                    case 'Storm':
                                    case 'Thunderstorm':
                                        svgStringer += '<svg viewBox="3487.9 -810.7 291.2 200.3"><g data-name="Strom icon" transform="translate(1959 -1260.7)"><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 14" rx="55.3" ry="51.7"transform="translate(1529 490.4)"/> <ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 15" rx="55.3" ry="51.7"transform="translate(1569.6 467.8)"/><circle cx="55.3" cy="55.3" r="55.3" class="cls-99" data-name="Ellipse 16"transform="translate(1618.9 476.8)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 17" rx="55.3" ry="51.7"transform="translate(1631.8 450)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 18" rx="55.3" ry="51.7"transform="translate(1687.1 477.5)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 19" rx="55.3" ry="51.7"transform="translate(1709.6 507.3)"/><circle cx="55.3" cy="55.3" r="55.3" class="cls-99" data-name="Ellipse 20"transform="translate(1639.6 500.1)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 21" rx="55.3" ry="51.7"transform="translate(1569.6 507.3)"/><path fill="none" stroke="#fd0" stroke-width="18"d="M1732.5 644l-61.4-61.4 22.5-10.3 26.8 5.1 9.5-22.4-38-37.2" data-name="Path 59"/><path fill="none" stroke="#fd0" stroke-width="15" d="M1597.2 539.5l31.2 25.9-24.8 22.2 17.3 36.2"data-name="Path 60"/></g></svg>';
                                        break;
                                    case 'Snow':
                                        svgStringer += '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M21.75 19.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm2 2.5c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm4.094 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm3.906 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm4.25-9.028c0 2.362-1.949 4.278-4.355 4.278h-10.291c-1.55 0-2.902-.802-3.674-2h-1.326c-2.405 0-4.354-1.916-4.354-4.278 0-2.101 1.545-3.847 3.578-4.206.168-3.073 2.75-5.516 5.922-5.516 1.797 0 3.403.785 4.49 2.024 3.4-.286 6.254 2.259 6.432 5.491 2.033.36 3.578 2.106 3.578 4.207zm-12.21-9.077c-.576-.395-1.323-.645-2.29-.645-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.257 1.057 2.278 2.354 2.278h.674c-.146-2.357 1.528-4.127 3.551-4.484.115-2.126 1.388-3.95 3.211-4.871zm3.711 6.855l1.499-.881-.521-.867-1.479.881v-1.633h-1v1.633l-1.494-.896-.506.867 1.499.896-1.499.865.537.867 1.463-.865v1.633h1v-1.633l1.467.869.533-.867-1.499-.869z"/></svg>';
                                        break;
                                }                                        


                                if(charHours > 12){
                                    if((charHours - 12) <= 12){
                                        if((charHours - 12) == 12){
                                            start += '<li><div class = "hourlyForecastHolder">';
                                                start += '<h3><span>' + (charHours - 12) + 'AM</span></h3><div><span>' + Math.floor(data2.hourly[hourlyHour].temp) + '°</span></div>';    
                                                start += svgStringer;
                                            start += '</div></li>';
                                        }
                                        else{
                                            start += '<li><div class = "hourlyForecastHolder">';
                                                start += '<h3><span>' + (charHours - 12) + 'PM</span></h3><div><span>' + Math.floor(data2.hourly[hourlyHour].temp) + '°</span></div>';    
                                                start += svgStringer;
                                            start += '</div></li>';
                                            }
                                    }
                                    else{
                                        start += '<li><div class = "hourlyForecastHolder">';
                                                start += '<h3><span>' + (charHours - 24) + 'AM</span></h3><div><span>' + Math.floor(data2.hourly[hourlyHour].temp) + '°</span></div>';    
                                                start += svgStringer;
                                        start += '</div></li>';
                                    }
                                }

                                else{
                                    if(charHours == 0){
                                        start += '<li><div class = "hourlyForecastHolder">';
                                                start += '<h3><span>12AM</span></h3><div><span>' + Math.floor(data2.hourly[hourlyHour].temp) + '°</span></div>';  
                                                start += svgStringer;  
                                        start += '</div></li>';
                                    }
                                    else if(charHours == 12){
                                        start += '<li><div class = "hourlyForecastHolder">';
                                                start += '<h3><span>12PM</span></h3><div><span>' + Math.floor(data2.hourly[hourlyHour].temp) + '°</span></div>';    
                                                start += svgStringer;
                                        start += '</div></li>';
                                    }
                                    else{
                                        start += '<li><div class = "hourlyForecastHolder">';
                                                start += '<h3><span>' + charHours + 'AM</span></h3><div><span>' + Math.floor(data2.hourly[hourlyHour].temp) + '°</span></div>';    
                                                start += svgStringer;
                                        start += '</div></li>';
                                    }
                                }
                                charHours += 1;
                                hourlyHour += 1;
                                svgStringer = '';
                            }

                

                        start += '</ul>';
                    start += '</div>';
                    
                    start += '<div class ="moreHours"><a href = "hourly.html">Next 48 hours</a></div>';
                    
                start += '</div>'


                start += '<div class = "hourlyDetails">'

                    start += '<header><h2>Daily Forecast</h2></header>';
                    start += '<div class = "hourlyInfo">'
                        start += '<ul>';


                            let getDay = new Date();
                            let dailyDay = 0;
                            let svgStringer2 = '';

                            for(i = 0; i < 5; i++){


                                switch(data2.daily[dailyDay].weather[0].main){
                                    case 'Sunny':
                                    case 'Clear':
                                        svgStringer2 += '<svg viewBox="2050 -845 262 262"><circle cx="131" cy="131" r="131" fill="#ffde17" data-name="Sun Icon" transform="translate(2050 -845)"/></svg>';
                                        break;
                                    case 'Clouds':
                                        svgStringer2 += '<svg viewBox="2436.9 -843.1 275.5 274.1"><g data-name="cloudy icon" transform="translate(84 790)"><circle cx="137" cy="137" r="137" fill="#fff" data-name="Ellipse 23" transform="translate(2354 -1633)"/><path fill="#ffde17"d="M2523.4-1361.5a37.2 37.2 0 0 0 8.4-23.4c0-22-19.8-40-44.1-40l-3.4.1h-.5a39.8 39.8 0 0 0-39.4-33.7 40.1 40.1 0 0 0-10 1.2 40 40 0 0 0-35.2-21.2 40.1 40.1 0 0 0-38.5 29 137.4 137.4 0 0 1-7.8-45.8 138.8 138.8 0 0 1 2.8-27.8 137 137 0 0 1 8-25.8 137.8 137.8 0 0 1 12.7-23.4 138.8 138.8 0 0 1 16.8-20.4 138.8 138.8 0 0 1 20.4-16.9 137.8 137.8 0 0 1 23.4-12.7 137 137 0 0 1 25.9-8 138.8 138.8 0 0 1 27.7-2.8 138.8 138.8 0 0 1 27.8 2.8 137 137 0 0 1 25.9 8 137.8 137.8 0 0 1 23.4 12.7 138.8 138.8 0 0 1 20.4 16.9 138.7 138.7 0 0 1 16.8 20.4 137.8 137.8 0 0 1 12.7 23.4 137 137 0 0 1 8 25.8 138.8 138.8 0 0 1 2.8 27.8 137.4 137.4 0 0 1-8 46.1 137.2 137.2 0 0 1-21.9 39.6 138.2 138.2 0 0 1-33.2 30.1 136.8 136.8 0 0 1-41.9 18z"data-name="Subtraction 1"/> </g></svg>';
                                        break;
                                    case 'Rain':
                                    case 'Drizzle':
                                    case 'Mist':
                                        svgStringer2 += '<svg class="rainChecker Icon--icon--2AbGu Icon--actionTheme--2vSlg DetailsTable--icon--34dUa" theme="action" set="current-conditions" name="humidity" data-testid="Icon" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4"></path></svg>';
                                        break;
                                    case 'Haze':
                                    case 'Fog':
                                    case 'Smoke':
                                        svgStringer2 += '<svg viewBox="0 0 454 366"><path fill="#12bcff"d="M340 110c-40 0-75-14-110-26-30-11-61-21-92-27-35-6-65 6-89 34a28 28 0 0 1-40 3C-3 83-3 66 8 54 53 1 110-9 174 7c36 9 71 25 106 36 19 5 39 10 58 11 27 2 48-13 65-33 12-13 29-15 41-5s13 28 1 41c-28 33-63 53-105 53zM120 312c-27-1-51 11-70 34-11 13-29 15-41 4-12-10-12-28-1-40 45-53 103-63 167-47 37 10 72 25 108 36 18 6 37 10 55 11 27 2 47-12 64-32 8-9 17-15 30-12 21 4 29 28 16 45-37 45-85 65-143 51-34-8-66-21-99-32-27-9-53-18-86-18zM123 128c42 1 81 15 120 29 26 9 52 18 79 24 28 6 53-3 74-24l11-11c11-11 27-11 39-1 10 10 11 26 1 38-35 43-81 64-137 52-34-7-67-20-100-32-29-10-59-20-91-19-28 1-51 13-69 34-12 13-29 15-41 4s-12-28 0-41c30-35 68-52 114-53z"/></svg>';
                                        break;
                                    case 'Storm':
                                    case 'Thunderstorm':
                                        svgStringer2 += '<svg viewBox="3487.9 -810.7 291.2 200.3"><g data-name="Strom icon" transform="translate(1959 -1260.7)"><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 14" rx="55.3" ry="51.7"transform="translate(1529 490.4)"/> <ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 15" rx="55.3" ry="51.7"transform="translate(1569.6 467.8)"/><circle cx="55.3" cy="55.3" r="55.3" class="cls-99" data-name="Ellipse 16"transform="translate(1618.9 476.8)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 17" rx="55.3" ry="51.7"transform="translate(1631.8 450)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 18" rx="55.3" ry="51.7"transform="translate(1687.1 477.5)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 19" rx="55.3" ry="51.7"transform="translate(1709.6 507.3)"/><circle cx="55.3" cy="55.3" r="55.3" class="cls-99" data-name="Ellipse 20"transform="translate(1639.6 500.1)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 21" rx="55.3" ry="51.7"transform="translate(1569.6 507.3)"/><path fill="none" stroke="#fd0" stroke-width="18"d="M1732.5 644l-61.4-61.4 22.5-10.3 26.8 5.1 9.5-22.4-38-37.2" data-name="Path 59"/><path fill="none" stroke="#fd0" stroke-width="15" d="M1597.2 539.5l31.2 25.9-24.8 22.2 17.3 36.2"data-name="Path 60"/></g></svg>';
                                        break;
                                    case 'Snow':
                                        svgStringer2 += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill = "#3b79a6" d="M21.75 19.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm2 2.5c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm4.094 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm3.906 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm4.25-9.028c0 2.362-1.949 4.278-4.355 4.278h-10.291c-1.55 0-2.902-.802-3.674-2h-1.326c-2.405 0-4.354-1.916-4.354-4.278 0-2.101 1.545-3.847 3.578-4.206.168-3.073 2.75-5.516 5.922-5.516 1.797 0 3.403.785 4.49 2.024 3.4-.286 6.254 2.259 6.432 5.491 2.033.36 3.578 2.106 3.578 4.207zm-12.21-9.077c-.576-.395-1.323-.645-2.29-.645-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.257 1.057 2.278 2.354 2.278h.674c-.146-2.357 1.528-4.127 3.551-4.484.115-2.126 1.388-3.95 3.211-4.871zm3.711 6.855l1.499-.881-.521-.867-1.479.881v-1.633h-1v1.633l-1.494-.896-.506.867 1.499.896-1.499.865.537.867 1.463-.865v1.633h1v-1.633l1.467.869.533-.867-1.499-.869z"/></svg>';
                                        break;
                                }                                        

                                if(i == 0){
                                    start += '<li><div class = "hourlyForecastHolder">';
                                    start += '<h3><span>Today</span></h3><div><span>' + Math.floor(data2.daily[dailyDay].temp.max) + '°</span></div>';    
                                    start += svgStringer2;
                                    start += '</div></li>'; 
                                }


                                else{

                                    getDay.setDate(getDay.getDate() + 1);
                                    console.log(getDay);
                                    let nextDay = getDay.toString().split(" ")[0] + " " + getDay.toString().split(" ")[2];
                                    start += '<li><div class = "hourlyForecastHolder">';
                                            start += '<h3><span>' + nextDay + '</span></h3><div><span>' + Math.floor(data2.daily[dailyDay].temp.max) + '°</span></div>';    
                                            start += svgStringer2;
                                    start += '</div></li>';
                                    
                                }
                                dailyDay += 1;
                                svgStringer2 = '';
                            }

                

                        start += '</ul>';
                    start += '</div>';
                    
                    start += '<div class ="moreHours"><a href = "daily.html">Next 7 Days</a></div>';
                    
                start += '</div>'




                weatherDataContentText.html(start);
                date = new Date(); 


                // $('.addCities').css('display', 'block');

                for(i = 0; i < cities.length; i++){
                    if(inputedCity == cities[i]){
                        $('#plus_Icon').css('backgroundColor', 'red');
                        $('#plus_Icon').children().css('color', 'black');
                        $('#plus_Icon').children().html('Remove City');
                        break;
                    }
                    else{
                        $('#plus_Icon').css('backgroundColor', 'green');
                        $('#plus_Icon').children().css('color', 'white');
                        $('#plus_Icon').children().html('Add City');
                    }
                }
                $('.weatherDataContent').css('display', 'block');
                $('.errorMessage').css('display', 'none');
                window.localStorage.setItem('searchedCity', data.name);
                addorremoveError = false;
            });
            
        })
        .fail(function(){
            console.log('failed to reach this area');
            $('.errorMessage').css('display', 'block');
            $('.weatherDataContent').css('display', 'none');
            
            $('#add').css('display', 'none');
            $('#remove').css('display', 'none');
            addorremoveError = true;
            
        });
        

        //reset all variables. 
        $('#jameson').trigger('reset'); 
        start = '';
        avgMorningTempurature = 0;
        avgAfternoonTemperature = 0;
        avgEveningTemperature = 0;
        avgNighttemperature = 0;

        // window.localStorage.setItem('searchedCity', city);
    }



    $('#Menu_Burger_Icon').on('click', function(){

        $('.sideMenu').css('display', 'block');
        $('.sideMenuActive').css('transform', 'translateX(0)'); 
        if(cities.length > 0){
            $('.sideMenuActiveDiv header').children().replaceWith('<h5>Your Locations</h5>');
            console.log('sfdfsfdsfsfdsfsdfdsfd');
            for(i = 0; i < cities.length; i++){
                console.log(i);
                $.get(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&units=${unitOfMeasurement}&appid=${apiKey}`, function(data, status){
                    console.log(data);
                })
                .done(function(data){
                    console.log(cities[i]);
                    $('.savedCitiesSideMenu').append('<a href = "weatherapp.html"><li class = "sideMenuLi"><span class = "value">' + data.name + '</span><span> ' + Math.floor(data.main.temp) + '°</span></li></a>');
                    $(".sideMenuLi").on('click', function(){
                        console.log($(this).children(".value").html());
                        window.localStorage.setItem("searchedCity", $(this).children(".value").html());
                    });
                });

            }
        }


        if("searchedCity" in localStorage){

            if(cities.length > 0){
                for(i = 0; i < cities.length; i++){
                    if(cities[i] == window.localStorage.getItem("searchedCity")){
                        $('#add').css("display", "none");
                        $("#remove").css("display", "block");
                        break;
                    }
                    else{
                        console.log('are we getting here or are we being difficult like always?');
                        $("#add").css("display", "block");
                        $("#remove").css("display", "none");
                        
                    }
                }
            }
            if(cities.length <= 0 && !addorremoveError){
                $("#add").css("display", "block");
                $("#remove").css("display", "none");
            }
        }

    });

    $('#celsius').on('click', function(){
        unitOfMeasurement = 'metric';
        console.log('unit of measurement has been changed to metric');
        $('#celsius').css('color', 'cyan');
        $('#fahrenheit').css('color', 'white');
        getWeatherInfo();
    });


    $('#fahrenheit').on('click', function(){
        unitOfMeasurement = 'imperial';
        console.log('unit of measurement has been changed to imperial');
        $('#fahrenheit').css('color', 'cyan');
        $('#celsius').css('color', 'white');
        getWeatherInfo();
    });


    $('#fahrenheit1').on('click', function(){
        window.localStorage.setItem('unit', 'imperial');
        unitOfMeasurement = 'imperial';
        console.log('unit of measurement has been changed to imperial');
        $('#fahrenheit1').css('color', 'cyan');
        $('#celsius1').css('color', 'black');
        getWeatherInfo();
    });

    $('#celsius1').on('click', function(){
        window.localStorage.setItem('unit', 'metric');
        unitOfMeasurement = 'metric';
        console.log('unit of measurement has been changed to metric');
        $('#celsius1').css('color', 'cyan');
        $('#fahrenheit1').css('color', 'black');
        getWeatherInfo();
    });

    $('#closeX').on('click', function(){
        $('.sideMenu').css('display', 'none');
        $('.sideMenuActive').css('transform', 'translateX(100%)');
        $('.savedCitiesSideMenu').children().remove();  
    });

    $('.sideMenu').on('click', function(){
        $('.sideMenu').css('display', 'none');
        $('.sideMenuActive').css('transform', 'translateX(100%)');
        $('.savedCitiesSideMenu').children().remove();
    });

    $('#add').on('click', function(){

        let searchedCity = window.localStorage.getItem("searchedCity");

        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=${unitOfMeasurement}&appid=${apiKey}`, function(data, status){
            console.log(data);
        })
        .done(function(data){
            $('.savedCitiesSideMenu').append('<a href = "weatherapp.html"><li class = "sideMenuLi"><span class = "value">' + data.name + '</span><span> ' + Math.floor(data.main.temp) + '°</span></li></a>');
            $(".sideMenuLi").on('click', function(){
                console.log($(this).children(".value").html());
                window.localStorage.setItem("searchedCity", $(this).children(".value").html());
            });
            $('#remove').css('display', 'block');
            $('#add').css('display', 'none');
            cities.push(data.name);
            window.localStorage.setItem('cityName', JSON.stringify(cities));  
        });

    });

    $('#remove').on('click', function(){
        let removedCity = window.localStorage.getItem("searchedCity");
        $('.savedCitiesSideMenu').children().remove(`:contains('${removedCity}')`);
        $(this).css('display', 'none');
        $('#add').css('display', 'block');

        for(i = 0; i < cities.length; i++){
            if(removedCity == cities[i]){
                cities.splice(i, 1);
                localStorage.setItem('cityName', JSON.stringify(cities));
                break;
            }
            
        }
    });

});
