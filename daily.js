

$(function(){


    //this is to make sure that the user has actually searched for a city. If the user has not searched for a city at all and tries to access this page, then it will redirect them 
    //to the home page.
    if("searchedCity" in localStorage){
        let dailyCity;
        let apiKey = "48ef76dd06c684c6abd02d37d95a18b1";
        let long;
        let lat; 
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
        let rnString = "";
        let theMainString = $(".rnDailyWeather");
        let newDate = new Date();

        if(window.localStorage.getItem('searchedCity')){
            dailyCity = window.localStorage.getItem('searchedCity');
            getWeatherInfo();
        }

        $('#getDailyForm').on('submit', function(){
            window.localStorage.setItem('searchedCity', $('#cityIdGetterFromDaily').val());
        })

        function getWeatherInfo(){
            $.get(`https://api.openweathermap.org/data/2.5/weather?q=${dailyCity}&units=${unitOfMeasurement}&appid=${apiKey}`, function(data, status){
        
            })
            .done(function(cityQuickData){
                long = cityQuickData.coord.lon;
                lat = cityQuickData.coord.lat;
        
                $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${unitOfMeasurement}&appid=${apiKey}`, function(data2, status){
        
                    console.log(data2); //this is good to see the data that has been retrieved from the get request.
        
        
                    let hour = newDate.getHours();
                    
        
                    if(hour < 12){
                        if(hour == 0){
                            hour = "12 am";
                        }
                        else{
                        hour = hour + " am";  
                        }
                        
                    }
                    else{
        
                        if(hour == 12){
                            hour = hour + " pm";
                        }
                        else{
                        hour = (hour - 12) + " pm";  
                        }
                        
                    }
        
                    rnString += '<h1><strong>7 Day Weather</strong><span id = "cityforH1"> - ' + cityQuickData.name +'</span></h1>';
                    rnString += '<p class = "asofPHourly">as of: ' + hour + '</p>';

                    let eachDay;
                    let toggleSwitch = 'toggle';
        
        
                    for(i = 0; i < data2.daily.length; i++){
        
                        
        
                        if(i == 0){
                            eachDay = 'Today';
                        }
                        else{
                            newDate.setDate(newDate.getDate() + 1);
                            eachDay = newDate.toString();
                            eachDay = eachDay.split(" ")[0] + " " +  eachDay.split(" ")[2];
                        }
        
                        let svgIcon = "";
                        let rainC = "";
        
                        switch(data2.daily[i].weather[0].main){
                            case 'Sunny':
                            case 'Clear':
                                svgIcon += '<svg class = "svgIcon" viewBox="2050 -845 262 262"><circle cx="131" cy="131" r="131" fill="#ffde17" data-name="Sun Icon" transform="translate(2050 -845)"/></svg>';
                                
                                break;
                            case 'Clouds':
                                svgIcon += '<svg class = "svgIcon" viewBox="2436.9 -843.1 275.5 274.1"><g data-name="cloudy icon" transform="translate(84 790)"><circle cx="137" cy="137" r="137" fill="#fff" data-name="Ellipse 23" transform="translate(2354 -1633)"/><path fill="#ffde17"d="M2523.4-1361.5a37.2 37.2 0 0 0 8.4-23.4c0-22-19.8-40-44.1-40l-3.4.1h-.5a39.8 39.8 0 0 0-39.4-33.7 40.1 40.1 0 0 0-10 1.2 40 40 0 0 0-35.2-21.2 40.1 40.1 0 0 0-38.5 29 137.4 137.4 0 0 1-7.8-45.8 138.8 138.8 0 0 1 2.8-27.8 137 137 0 0 1 8-25.8 137.8 137.8 0 0 1 12.7-23.4 138.8 138.8 0 0 1 16.8-20.4 138.8 138.8 0 0 1 20.4-16.9 137.8 137.8 0 0 1 23.4-12.7 137 137 0 0 1 25.9-8 138.8 138.8 0 0 1 27.7-2.8 138.8 138.8 0 0 1 27.8 2.8 137 137 0 0 1 25.9 8 137.8 137.8 0 0 1 23.4 12.7 138.8 138.8 0 0 1 20.4 16.9 138.7 138.7 0 0 1 16.8 20.4 137.8 137.8 0 0 1 12.7 23.4 137 137 0 0 1 8 25.8 138.8 138.8 0 0 1 2.8 27.8 137.4 137.4 0 0 1-8 46.1 137.2 137.2 0 0 1-21.9 39.6 138.2 138.2 0 0 1-33.2 30.1 136.8 136.8 0 0 1-41.9 18z"data-name="Subtraction 1"/> </g></svg>';
                                break;
                            case 'Rain':
                            case 'Drizzle':
                            case 'Mist':
                                svgIcon += '<svg class = "rainChecker" viewBox="3170 -843.1 163.5 242.7"><g data-name="Rain Icon"><g data-name="Water Drops"><path fill="#0032cc" d="M3295.4-824.5s85.8 133.5 0 133.5 0-133.5 0-133.5z" data-name="Path 7"/><path fill="#003eff" d="M3239.4-843s-156.1 242.6 0 242.6 0-242.7 0-242.7z" data-name="Path 3"/></g></g></svg>';
                                rainC += '<svg class = "rainChecker" viewBox="3170 -843.1 163.5 242.7"><g data-name="Rain Icon"><g data-name="Water Drops"><path fill="#0032cc" d="M3295.4-824.5s85.8 133.5 0 133.5 0-133.5 0-133.5z" data-name="Path 7"/><path fill="#003eff" d="M3239.4-843s-156.1 242.6 0 242.6 0-242.7 0-242.7z" data-name="Path 3"/></g></g></svg>';
                                break;
                            case 'Haze':
                            case 'Fog':
                            case 'Smoke':
                                svgIcon += '<svg class = "svgIcon" viewBox="0 0 454 366"><path fill="#12bcff"d="M340 110c-40 0-75-14-110-26-30-11-61-21-92-27-35-6-65 6-89 34a28 28 0 0 1-40 3C-3 83-3 66 8 54 53 1 110-9 174 7c36 9 71 25 106 36 19 5 39 10 58 11 27 2 48-13 65-33 12-13 29-15 41-5s13 28 1 41c-28 33-63 53-105 53zM120 312c-27-1-51 11-70 34-11 13-29 15-41 4-12-10-12-28-1-40 45-53 103-63 167-47 37 10 72 25 108 36 18 6 37 10 55 11 27 2 47-12 64-32 8-9 17-15 30-12 21 4 29 28 16 45-37 45-85 65-143 51-34-8-66-21-99-32-27-9-53-18-86-18zM123 128c42 1 81 15 120 29 26 9 52 18 79 24 28 6 53-3 74-24l11-11c11-11 27-11 39-1 10 10 11 26 1 38-35 43-81 64-137 52-34-7-67-20-100-32-29-10-59-20-91-19-28 1-51 13-69 34-12 13-29 15-41 4s-12-28 0-41c30-35 68-52 114-53z"/></svg>';
                                break;
                            case 'Storm':
                            case 'Thunderstorm':
                                svgIcon += '<svg class = "svgIcon" viewBox="3487.9 -810.7 291.2 200.3"><g data-name="Strom icon" transform="translate(1959 -1260.7)"><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 14" rx="55.3" ry="51.7"transform="translate(1529 490.4)"/> <ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 15" rx="55.3" ry="51.7"transform="translate(1569.6 467.8)"/><circle cx="55.3" cy="55.3" r="55.3" class="cls-99" data-name="Ellipse 16"transform="translate(1618.9 476.8)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 17" rx="55.3" ry="51.7"transform="translate(1631.8 450)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 18" rx="55.3" ry="51.7"transform="translate(1687.1 477.5)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 19" rx="55.3" ry="51.7"transform="translate(1709.6 507.3)"/><circle cx="55.3" cy="55.3" r="55.3" class="cls-99" data-name="Ellipse 20"transform="translate(1639.6 500.1)"/><ellipse cx="55.3" cy="51.7" class="cls-99" data-name="Ellipse 21" rx="55.3" ry="51.7"transform="translate(1569.6 507.3)"/><path fill="none" stroke="#fd0" stroke-width="18"d="M1732.5 644l-61.4-61.4 22.5-10.3 26.8 5.1 9.5-22.4-38-37.2" data-name="Path 59"/><path fill="none" stroke="#fd0" stroke-width="15" d="M1597.2 539.5l31.2 25.9-24.8 22.2 17.3 36.2"data-name="Path 60"/></g></svg>';
                                break;
                            case 'Snow':
                                svgIcon += '<svg class = "svgIcon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill ="#3b79a6" d="M21.75 19.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-4 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm2 2.5c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm4.094 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm3.906 0c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm4.25-9.028c0 2.362-1.949 4.278-4.355 4.278h-10.291c-1.55 0-2.902-.802-3.674-2h-1.326c-2.405 0-4.354-1.916-4.354-4.278 0-2.101 1.545-3.847 3.578-4.206.168-3.073 2.75-5.516 5.922-5.516 1.797 0 3.403.785 4.49 2.024 3.4-.286 6.254 2.259 6.432 5.491 2.033.36 3.578 2.106 3.578 4.207zm-12.21-9.077c-.576-.395-1.323-.645-2.29-.645-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.257 1.057 2.278 2.354 2.278h.674c-.146-2.357 1.528-4.127 3.551-4.484.115-2.126 1.388-3.95 3.211-4.871zm3.711 6.855l1.499-.881-.521-.867-1.479.881v-1.633h-1v1.633l-1.494-.896-.506.867 1.499.896-1.499.865.537.867 1.463-.865v1.633h1v-1.633l1.467.869.533-.867-1.499-.869z"/></svg>';
                                break;
                        } 
        
                        rnString += '<div class = "eachDayDiv">';
                            rnString += `<div class = "rnWeatherInfo dropdown${i}">`;
                                rnString += '<p class = "timeHour">' + eachDay + '</p>';
                                rnString += '<p class = "tempo">' + Math.floor(data2.daily[i].temp.max) + '°/' + Math.floor(data2.daily[i].temp.min) +'°</p>';
                                rnString += '<p>' + svgIcon + '</p>';
                                rnString += '<p><svg class = "rainChecker2" viewBox="3170 -843.1 163.5 242.7"><g data-name="Rain Icon"><g data-name="Water Drops"><path fill="#0032cc" d="M3295.4-824.5s85.8 133.5 0 133.5 0-133.5 0-133.5z" data-name="Path 7"/><path fill="#003eff" d="M3239.4-843s-156.1 242.6 0 242.6 0-242.7 0-242.7z" data-name="Path 3"/></g></g></svg>' + Math.round((data2.daily[i].pop * 100)) + '%</p>';
                                
                            rnString += '</div>';
        
                            rnString += '<p id = "'+ toggleSwitch + i + '" class = "toggleInfo"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929;" xml:space="preserve"><g><path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/></g></p>';
                            
                            rnString += '<div class = "childInfo">';
        
                                rnString += '<h3><span>' + eachDay + '</span> | day</h3>';
                                rnString += '<div class = "dayInfo">';
        
                                    rnString += '<div class = "DayTempDiv"><span class = "DayTemp">' + Math.floor(data2.daily[i].temp.max) + '°</span></div>';
                                    rnString += svgIcon;
                                    rnString += '<div class = "rainNwind">';
        
                                        rnString += '<p class = "rainPercSvg"><svg class = "rainChecker2" viewBox="3170 -843.1 163.5 242.7"><g data-name="Rain Icon"><g data-name="Water Drops"><path fill="#0032cc" d="M3295.4-824.5s85.8 133.5 0 133.5 0-133.5 0-133.5z" data-name="Path 7"/><path fill="#003eff" d="M3239.4-843s-156.1 242.6 0 242.6 0-242.7 0-242.7z" data-name="Path 3"/></g></g></svg><span>' + Math.round((data2.daily[i].pop * 100)) + '%</span></p>';
                                        rnString += '<p><svg class = "windChecker" arialabel="Wind" class="Icon--icon--2AbGu Icon--actionTheme--2vSlg DailyContent--windIcon--35FOj" theme="action" set="current-conditions" name="wind" data-testid="Icon" viewBox="0 0 24 24"><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" stroke-width="2" stroke="currentColor" stroke-linecap="round" fill="#003eff"></path></svg><span>' + data2.daily[i].wind_speed + ' mph</span></p>';
                                    
                                    rnString += '</div>';
        
                                rnString += '</div>';
        
                                rnString += '<div class = "extraDayInfo">';
        
                                    rnString += '<div class ="extra1">';
                                        rnString += '<div style = "display: flex;"><svg class="Icon--icon--2AbGu Icon--actionTheme--2vSlg DetailsTable--icon--34dUa" theme="action" set="current-conditions" name="humidity" data-testid="Icon" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4"></path></svg><p class = "humidityP">Humidity</p></div>';
                                        rnString += '<p class = "humidity">' + Math.floor(data2.daily[i].humidity) + '%</p>'
                                    rnString += '</div>';
        
                                    rnString += '<div class = "extra2">';
                                        rnString += '<div style = "display: flex;">';
                                            rnString += '<svg class="Icon--icon--2AbGu Icon--actionTheme--2vSlg DetailsTable--icon--34dUa" theme="action" set="current-conditions" name="uv" data-testid="Icon" viewBox="0 0 24 24"><path d="M7.4 5.598a.784.784 0 0 1 .25-.92c.335-.256.824-.197 1.02.062.066.063.066.063.08.085l2.406 3.152-.626.238a3.983 3.983 0 0 0-1.097.633l-.522.424L7.4 5.598zm4.539 2.358c-.21 0-.418.017-.625.05l-.664.106.09-.666.438-3.266c.013-.072.013-.072.012-.057a.783.783 0 0 1 .666-.616.78.78 0 0 1 .872.639l.006.038.507 3.933-.662-.108a3.957 3.957 0 0 0-.64-.053zm-7.781 3.19l.026-.004 3.934-.507-.108.662a3.98 3.98 0 0 0-.003 1.266l.105.664-.665-.09-3.265-.439a.784.784 0 0 1-.676-.679c-.054-.42.238-.809.63-.869l.022-.004zm11.504-.617a3.98 3.98 0 0 0-.632-1.097l-.425-.522.623-.256 3.056-1.256a.787.787 0 0 1 .916.253c.256.337.199.817-.104 1.063l-.045.037-3.151 2.405-.238-.627zm-1.205-1.672a3.984 3.984 0 0 0-1.095-.637l-.626-.24.41-.532 2.008-2.602c.059-.07.059-.07.046-.052a.78.78 0 0 1 1.306.227c.076.185.079.39.02.54l-.021.06-1.528 3.662-.52-.426zM4.595 7.793c.162-.387.611-.58.971-.441.017.004.017.004.055.02L9.283 8.9l-.425.52a3.985 3.985 0 0 0-.636 1.094l-.24.627-3.144-2.425a.784.784 0 0 1-.243-.924zm14.443 7.367c.054.045.054.045.044.04a.784.784 0 0 1 .199.884c-.163.386-.61.58-.964.443-.024-.006-.024-.006-.062-.022l-3.662-1.529.426-.52a3.98 3.98 0 0 0 .636-1.094l.241-.626 3.142 2.424zm1.332-3.303c.053.422-.239.809-.63.87l-.035.006-3.945.508.108-.662a3.999 3.999 0 0 0 .003-1.266l-.105-.663.665.09 3.272.44c.068.012.068.012.052.01a.784.784 0 0 1 .615.667zm-3.894 6.421c.024.068.024.068.017.053a.786.786 0 0 1-.27.87c-.332.25-.816.194-1.047-.091-.022-.023-.022-.023-.05-.058l-2.406-3.154.626-.237a3.977 3.977 0 0 0 1.097-.632l.523-.425 1.51 3.674zm-8.26-4.932c.151.397.365.767.633 1.097l.424.522-.622.256-3.054 1.255a.787.787 0 0 1-.92-.25.781.781 0 0 1-.154-.58c.027-.199.127-.379.227-.452.045-.046.045-.046.075-.069l3.153-2.406.238.627zm3.723 2.572c.209 0 .417-.016.625-.049l.662-.103-.089.664-.438 3.26-.012.062a.785.785 0 0 1-.666.618c-.048.005-.048.005-.101.006-.386 0-.714-.28-.764-.612-.01-.043-.01-.043-.014-.072l-.507-3.934.662.108c.213.035.427.052.642.052zM7.366 18.27l.006-.015L8.9 14.592l.52.426a3.99 3.99 0 0 0 1.094.636l.626.241-.41.531-2.012 2.609-.04.046a.788.788 0 0 1-.886.2.787.787 0 0 1-.428-1.011z"></path><path d="M11.911 14.322a2.411 2.411 0 1 0 0-4.822 2.411 2.411 0 0 0 0 4.822zm0 2a4.411 4.411 0 1 1 0-8.822 4.411 4.411 0 0 1 0 8.822z"></path></svg>';
                                            rnString += '<p class = "uvIndex">UV Index</p>';
                                        rnString += '</div>';
                                        rnString += '<p class = "uv">' + Math.floor(data2.daily[i].uvi) + ' of 10</p>';
                                    rnString += '</div>';
        
                                    rnString += '<div class ="extra3">';
                                        rnString += '<div style = "display: flex;"><svg class="Icon--icon--2AbGu Icon--actionTheme--2vSlg DetailsTable--icon--34dUa" theme="action" set="current-conditions" name="sunrise-sun" data-testid="Icon" viewBox="0 0 24 24"><path d="M12.003 16.125v-2.21m-5.602 2.129l1.69 1.441m9.237-1.489l-1.4 1.63" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M4.05 20.938h2.48m11.27 0h2.481" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 9.938V4.426M8.563 6.5L12 3.062M15.438 6.5L12 3.062" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path><path d="M12.02 21.605h3.059c.421 0 .543-.229.543-.455 0-1.735-1.613-3.142-3.602-3.142-1.99 0-3.603 1.407-3.603 3.142 0 .266.1.455.529.455h3.074z"></path></svg><p class = "humidityP">Sunrise</p></div>';
                                        let sunrise = getDate(data2.daily[i].sunrise);
                                        rnString += '<p class = "humidity">' + sunrise + '</p>'
                                    rnString += '</div>';
                                    
                                    rnString += '<div class = "extra4">';
                                        rnString += '<div style = "display: flex;">';
                                            rnString += '<svg class="Icon--icon--2AbGu Icon--actionTheme--2vSlg DetailsTable--icon--34dUa" theme="action" set="current-conditions" name="sunset-sun" data-testid="Icon" viewBox="0 0 24 24"><path d="M12.003 15.781v-2.21M6.401 15.7l1.69 1.442m9.237-1.49l-1.4 1.63" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M4.05 20.594h2.48m11.27 0h2.481" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 3.063v5.51M8.563 6.5L12 9.938M15.438 6.5L12 9.938" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path><path d="M12.02 21.261h3.059c.421 0 .543-.229.543-.455 0-1.735-1.613-3.142-3.602-3.142-1.99 0-3.603 1.407-3.603 3.142 0 .266.1.455.529.455h3.074z"></path></svg>';
                                            rnString += '<p class = "uvIndex">Sunset</p>';
                                        rnString += '</div>';
                                        let sunset = getDate2(data2.daily[i].sunset);
                                        rnString += '<p class = "uv">' + sunset + '</p>';
                                    rnString += '</div>';
        
                                rnString += '</div>';
        
                            rnString += '</div>';
        
                        rnString += '</div>';
        
        
        
                    }     
                    newDate = new Date();
        
                })
                .done(function(data2){
                    
                    theMainString.html(rnString);
                    theMainString.css('display', 'block');
                    rnString = "";
        
                    $('.childInfo').css('display', 'none');
        
        
                    for(i = 0; i < data2.daily.length ; i++){
        
                        if(i == 0){
                            $('#toggle'+i).next().css('display', 'flex');
                            $('#toggle'+i).prev().children().css('display', 'none');
                        }
                        
                        $('#toggle'+i).on('click', openDetails);
        
                    }
                    
                    
        
                    function openDetails(){
        
                        if($(this).next().css('display') == 'none'){
                            $(this).next().css('display', 'flex');
                            $(this).prev().children().css('display', 'none');
                            $(this).children()
                            .replaceWith('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve"><path id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/></svg>');
                        }
                        else{
                            
                            $(this).next().css('display', 'none');
                            $(this).prev().children().css('display', 'block');
                            $(this).children()
                            .replaceWith('<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="284.929px" viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929;" xml:space="preserve"><g><path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/></g>');
                        }
        
                    }
        
        
                })
                .fail(function(){
                    console.log('failed to reach this area');
                    $('.errorMessage').css('display', 'block');
                    $('.weatherDataContent').css('display', 'none');
                });
            }); 
        }

        $('#fahrenheit1').on('click', function(){
            unitOfMeasurement = 'imperial';
            getWeatherInfo();
        });

        $('#celsius1').on('click', function(){
            unitOfMeasurement = 'metric';
            getWeatherInfo();
        });

        function getDate(sunriseTime){
            let sunrisetime = new Date(sunriseTime * 1000);

            var hours = sunrisetime.getHours();

            var minutes = "0" + sunrisetime.getMinutes();
            var newTime = '';

            if(hours < 12){
                newTime = hours + ":" + minutes.substr(-2) + ' am'; 
            }
            else if(hours > 12 && hours < 24){
                newTime = (hours - 12) + ":" + minutes.substr(-2) + ' pm'; 
            }
            else{
                newTime = hours + ":" + minutes.substr(-2)  
            }

            return newTime;
            
        }

        function getDate2(sunsetTime){
            let sunsettime = new Date(sunsetTime * 1000);

            var hours = sunsettime.getHours();

            var minutes = "0" + sunsettime.getMinutes();
            var newTime = '';

            if(hours < 12){
                newTime = hours + ":" + minutes.substr(-2) + ' am'; 
            }
            else if(hours > 12 && hours < 24){
                newTime = (hours - 12) + ":" + minutes.substr(-2) + ' pm'; 
            }
            else{
                newTime = hours + ":" + minutes.substr(-2)  
            }

            return newTime;
        }
    }

    else{
        window.location.replace("index.html");
    }


});