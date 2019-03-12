console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = search.value

    const url = 'http://localhost:3000/weather?city=' + city
    msg1.textContent = 'Loading weather information ...'
    msg2.textContent = ''
    
    fetch(url).then( (response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error.message
            } else {
                msg1.textContent = `City : ${data.city}`
                msg2.textContent = `Minimmum temperature is : ${data.minTemp}.` + '\n' + ` Maximum temperature is : ${data.maxTemp}.` + '\n' + ` Wind Speed is : ${data.windspeed}.`
            }
        })
    })
})
