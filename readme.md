# My Weather Post

Welcome to my simple weather page. This weather page/wesbite was built using Javascript and Jquery. I decided to create this project as a way to demenstrate my skills as a front end developer and to show my knowledge using javascript,jquery, and RESTful APIs. This simple project displays multiple type of forecasts. These are: Todays, 48 hours, and 7 day forecast for the city searched. As of right now, there is no specific filter for multiple cities with the same name. It goes off by whatever the weather api goes with. This is something I plan on working on soon. I also plan on adding a longitude and latitude filter which will also help out getting the exact city you need. For cities with unique names (no other city with the same name), it should work just fine. 

### This site is being hosted on [Amazon S3](http://cossich-weatherapp.s3-website-us-east-1.amazonaws.com/)


_How it Works_

Understanding and using this application is farely easy. When on the home page. You can see that the weather retreived is for leesburg. This of course is my hometown. On the top header is a search bar that allows you to search for a city of your choice. Once you the city has been searched, and brings back a valid response, the page is redirected to 'weatherapp.html' which displays todays foreacast for the given city. After this, the option to look at 48 hours and 7 days becomes available. 


**Saving Cities For Future Search:**
In this application, you can save cities so that you can view them later. On the side menu, you can access these saved cities. In the side menu the saved cities show the city name and the current temperature.


**Changing the Tempurature Metrics:**
You can also change the metric to display the temperature in either Celsius or Fahrenheit. This can be done my accessing the side menu. 



# Add your own API Key.
In this application. I use my own openweather api key in the get requests. Since, this is a specific api key given to me. You will need to create an account (if you havent done so already) with openweathermap.org/api and use the api key assigned to you. 



```JavaScript
$.get(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&units=${unitOfMeasurement}&appid=${apiKey}`, function(data, status){

})
};
```
Here in the get request, you will see the variable 'apiKey'. In each js file, the variable apiKey will be located on the top. Here you will need to replace whats there with your apiKey.
Once you get the api key, the app will work and get api data.