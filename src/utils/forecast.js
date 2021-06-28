const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=48602533ade57240e97a6e8ad1feba50&query=' + longitude + ',' + latitude +'&units=s'

    request({ url, json: true}, (error,{body}) => {
        if (error){
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another coordinate', undefined)
        } else {
            callback(undefined, {
                weather_descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels_like: body.current.feelslike
            })
        }
    })

}

module.exports = forecast