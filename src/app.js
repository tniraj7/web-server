const express = require('express')
const hbs = require('hbs')
const path = require('path')

//Paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Niraj'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Niraj'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'How may I help you ?',
    title: 'Help',
    name: 'Niraj'
  })
})

app.get('/help/*', (req, res) => {
  res.render('error404', {
    errorType: '404',
    errorMessage: "Help article Not Found",
    name: 'Niraj'
  })
})

const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res) => {
  if(!req.query.city) {
    return res.send({
        error: 'You must provide with the city name'
    }) 
  }
  res.send({
    city: req.query.city,
    min_temp: '7',
    max_temp: '12'
  })
})

app.get('*', (req, res) => {
  res.render('error404', {
      errorType: '404',
      errorMessage: "Page Not Found",
      name: 'Niraj'
  })

})
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
