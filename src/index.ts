import express, { Express, Request, Response } from 'express';
import cors from 'cors';           
import { type } from 'os';
const stripe = require('stripe')('sk_test_51MvJTbSGYUYqHJKjMMmnmLcheAzcTOgTyQeWyWMYC1RclEN93OQOc4qN8mcfulXekgGw5U7ztTTnUPrYnr6C94NN00VHGn2PpO');


const app: Express = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());


//price_1MvLG6SGYUYqHJKjbGDbUSun Car price_1MvLFGSGYUYqHJKjvRe1UdZl Banana price_1MvLEPSGYUYqHJKjRXEEqADN Computer
//price_1MvLDHSGYUYqHJKjF0iWLpnC Book
// Enable CORS for all origins (you can restrict it to specific origins)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const idArr: String[] = ['price_1MvLDHSGYUYqHJKjF0iWLpnC', 'price_1MvLEPSGYUYqHJKjRXEEqADN',  'price_1MvLFGSGYUYqHJKjvRe1UdZl',  'price_1MvLG6SGYUYqHJKjbGDbUSun' ]
app.post('/checkout', async (req: Request, res: Response) => {
  
  console.log(req.body);
  const items = req.body.items;
  let lineItems: any[] = [];
  items.forEach((item: { id: number; quantity: number }) => {
    lineItems.push({
      price: idArr[item.id - 1],
      quantity: item.quantity,
    });
  });
  
console.log(lineItems);
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/store',
  });

  res.send(JSON.stringify({
    url: session.url,
  }));
});

app.listen(4000, () => console.log('Listening on port 4000!'));