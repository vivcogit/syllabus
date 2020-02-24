/* global module */
/* eslint-disable @typescript-eslint/no-var-requires */
const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
require('dotenv').config();

module.exports = withSASS(withCSS({}));
