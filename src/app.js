const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const name = 'Zhuo Wang';

hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather for today',
        name: name
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Free Requests limited to 1000 times each day!',
        name
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
        products: []
    })
})
// app.get('/help', (req, res) => {
//     res.send([
//         {name: 'abc'},
//         {name: 'bcd'}
//     ]);
// })

// app.get('/about', (req, res) => {
//     res.send('about us');
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const address = req.query.address;

    geocode(address, (error, data) => {
        if(error) {
            return res.send({ error });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            res.send({ 
                forecast: forecastData,
                location: data.location,
                address: address
             });
        })

    })

    // res.send(
    //     {
    //         location: 'Munich',
    //         forecast: 'Sunny',
    //         address: req.query.address
    //     }
    // );
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Help article does not exist!',
        name: name
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'error',
        errorMessage: 'Page does not exist',
        name: name
    })
})

app.listen(port, () => {
    console.log('app starting...');
})