const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintainence.hbs');
});

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Bhargav',
    //     likes: [
    //         'Cars', 'Games'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});


app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request :('
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});