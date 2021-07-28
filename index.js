require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const i18n = require("i18n");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Config Internationalization
app.use(i18n.init);
i18n.configure({
    locales: ['en', 'vi'],
    directory: __dirname + '/locales',
    cookie: 'lang',
    defaultLocale: 'vi',
    updateFiles: false
});

// Mongoose
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err) {
        if (err) {
            console.log("connect fail : " + err);
        } else {
            console.log("DB connected!!!");
        }
    });

const adminRouter = require('./routes/admin.route');
/*
    Default Page
*/
app.get('/', function (req, res) {
    if (!req.cookies.lang) {
        res.cookie('lang', 'vi');
    }
    res.render('./pages/index', { title: "Duc Thanh Multimedia", lang: req.cookies.lang });
});
app.get('/error', function (req, res) {
    res.render('./pages/404');
});
app.use('/change-lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang);
    res.redirect('back');
});
/*
    Eror Page
*/
// app.get('/', function (req, res) {
//     res.render('./pages/404');
// });
/*
    FOR ADMIN
*/
app.use('/admin', adminRouter);

// Config Server Port
app.listen(PORT, function () {
    console.log(`Server started on ${PORT}!!!`);
});