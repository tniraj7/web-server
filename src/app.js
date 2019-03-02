const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req,res) => {
  res.send('Hello Express')
})

app.get('/help', (req, res) => {
  res.send('Help Page')
})

app.get('/about', (req, res) => {
  res.send('About Page')
})

app.get('/weather', (req, res) => {
  res.send(`Today's Weather Report`)
})
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
