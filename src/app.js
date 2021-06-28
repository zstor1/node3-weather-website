const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Miles'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Miles'

    })
})


app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help page',
        name: 'Miles',
        message: 'According to the laws of aviation there is no way that a bee'

    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecast_data) => {
            if(error){
                return res.send({error})
            }

            res.send({
                location,
                forecast: forecast_data,
                address: req.query.address
            })
        })
    })


})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render('404',{
        message: 'Help article not found!!',
        title: 'ERROR 404',
        name: 'Miles'
    })})

app.get('*', (req,res) => {
    res.render('404',{
        message: 'Page not found!!',
        title: 'ERROR 404',
        name: 'Miles'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})