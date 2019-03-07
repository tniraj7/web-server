const request = require('request')

const getWeather = (url, city, key) => {
    URL = url + `q=${city}` + `&appid=${key}`

    return new Promise((resolve, reject) => {
        request({
            url : URL,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject("Connectoin Issues")
            } else if (response) {
                if (response.statusCode === 401) {
                    reject("\nInvalid API key");
                } else if (response.statusCode === 404) {
                    reject("\nCity not found");
                } else if (response.statusCode === 501) {
                    reject("\nMaintenance mode");
                } else if (response.statusCode === 200){
                    resolve({
                        maxTemp : body.main.temp_max-273.15,
                        minTemp : body.main.temp_min-273.15
                        
                    })
                }
            }
        })
    })
}

module.exports = {
    getWeather
}