console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')
const msg3 = document.querySelector('#message3')
const msg4 = document.querySelector('#message4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = search.value

    const url = '/weather?city=' + city
    msg1.textContent = 'Loading weather information ...'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''
    
    fetch(url).then( (response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error.message
            } else {
                msg1.textContent = `Today's weather information for ${data.city} is as follows :`
                msg2.textContent = `Minimmum temperature is ${data.minTemp}.` 
                msg3.textContent = `Maximum temperature is ${data.maxTemp}.`
                msg4.textContent = `Wind speed is ${data.windspeed}.`
            }
        })
    })
})
