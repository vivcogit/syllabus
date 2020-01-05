const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS({
    env: {
        test: 'test',
        apiUri: process.env.API_URI,
        API_URI: process.env.API_URI,
    }
});
