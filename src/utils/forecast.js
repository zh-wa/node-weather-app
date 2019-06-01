const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/f56a77fa73b05a7ad84cfdc1ce05540e/${lat},${long}?units=si`;
    request( {url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location. Try again!', undefined);
        } else {
            callback(undefined, `It is ${response.body.currently.temperature} degrees outside. There is a ${response.body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast;