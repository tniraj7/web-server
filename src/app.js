const express = require('express')
const path = require('path')

const publicDirectory = path.join(__dirname, '../public')

const app = express()
app.use(express.static(publicDirectory))

const port = 3000;

app.get('/', (req,res) => {
  res.send('<h1>Weather</h1>')
})

app.get('/weather', (req, res) => {
  res.send({
    city : 'Tokyo',
    min_temp: '7',
    max_temp : '12'
  })
})
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
