const request = require('request');

const forecast = (latitude, longitude, callback)=> {
    const url = 'https://api.darksky.net/forecast/d08a417c81ce6e8e0e16c0f72b6741c6/' + latitude + ',' + longitude;
    request({ url: url,json:true }, (error, response) => {
          
        
        if (error) {
            callback('Unable to connect', undefined);
        } else if (response.body.currently.length == 0) {
            callback('Unable to find locations', undefined);
        }else{
            callback(undefined, {
                temperature:response.body.currently.temperature,
                precipProbability:response.body.currently.precipProbability
            });
        }
        
        })
}

module.exports =  forecast;