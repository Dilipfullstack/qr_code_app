const express = require('express');
const app = express();
const qrcode = require('qrcode')
const ejs = require('ejs');
const path = require('path')
const port = process.env.port || 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));


app.get('/', (req, res) => {
    res.render("index")
})

app.post('/scan', (req, res) => {
    const user_entry = req.body.text
    if(!user_entry) {
        res.render('empty.ejs')
    } else {
        qrcode.toDataURL(user_entry, (err, src) => {
            if(err) return res.send(err);
            res.render('scan', {qr_source: src})
        })
    }
})

app.listen(port, console.log(`listening to port ${port}`));