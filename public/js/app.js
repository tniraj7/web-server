console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = search.value
    const url = 'http://localhost:3000/weather?city=' + city
    fetch(url).then((response) => {
        response.json().then((error) => {
            console.log(error)
        }, (data) => {
            console.log(data)
        })
    })
})
