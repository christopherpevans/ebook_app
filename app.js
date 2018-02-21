const express = require('express');
const stripe = require('stripe')('sk_test_WyHuT3GA6IOoToNpla6CmqIx');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//  Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get('/', (req, res) => {
  res.render('index');
});

// Charge Route
app.post('/charge', (req, res) => {
  const amount = 999;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Web Development Ebook',
    currency: 'usd',
    customer:customer.id
  }))
  .then(charge => res.render('Success'));
});

const port = process.env.Port || 5000;

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
