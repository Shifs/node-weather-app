const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(path.join(__dirname, '../public'))

const app = express();
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))


// app.get('', (req, res) => {
//     res.send('<h1>Hello express !</h1>')
// })
// app.get('/help', (req, res) => {
//     res.send({
//         name:'Shifa',
//         age:27
//     })
// })
// app.get('/about', (req, res) => {
//     res.send('<h1> About </h1>')
// })
app.get('/weather', (req, res) => {
    console.log(req.query.address)

    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }


    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: 'Address is incorrect'
            })
        }


        forecast(data.latitude, data.longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error: 'No latitude or longitude'
                })
            }
            res.send({
                precipProbability: forecastdata.precipProbability,
                temperature: forecastdata.temperature,
                address: req.query.address
            })
            console.log('Data', forecastdata)
        })
    })






})
app.get('/products', (req, res) => {
    console.log(req.query.search)

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})


app.get('*', (req, res) => {
    res.send('My error page')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});