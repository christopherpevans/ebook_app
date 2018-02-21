const express = require('express');
const stripe = require('stripe')('sk_test_WyHuT3GA6IOoToNpla6CmqIx');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

const port = process.env.Port || 5000;

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
