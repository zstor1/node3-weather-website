const request = require('postman-request')

const geocode = (address = 'Sydney', callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoienN0b3IiLCJhIjoiY2txMGNxNXp6MDNsaTJ4cWk2eHRqMGVuOSJ9.e2jELqMQqpQVvedGjzQ_jg&limit=1'

    request({ url, json: true}, (error,{body}) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode