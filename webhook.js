
const stripe = require('stripe')(process.env.NEXT_PUBLIC_TEST_STRIPE_SECRET_KEY);


const endpointSecret = 'whsec_...';


const app = require('express')();


const bodyParser = require('body-parser');

const fulfillOrder = (lineItems) => {

  console.log("Fulfilling order", lineItems);
}

app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
  const payload = request.body;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
    );
    const lineItems = sessionWithLineItems.line_items;

    fulfillOrder(lineItems);
  }

  response.status(200).end();
});

app.listen(4242, () => console.log('Running on port 4242'));
