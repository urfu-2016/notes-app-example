const fs = require('fs');
const toIco = require('to-ico');

const logo = fs.readFileSync('public/logo.png');

toIco(logo)
    .then(buffer => {
        fs.writeFileSync('public/favicon.ico', buffer);
    });
