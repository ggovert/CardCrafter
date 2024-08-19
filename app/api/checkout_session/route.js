import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// create a stripe obj
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// Convert the currency
const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

export async function GET(req, { params }) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get('session_id');

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error('Error retrieving checkout session: ', error);
    return NextResponse.json(
      error,
      { message: error.message },
      { status: 500 }
    );
  }
}

//POST Request
export async function POST(req) {
  // Create Checkout Sessions from body params.
  const params = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'CardCrafter Premium',
          },
          unit_amount: formatAmountForStripe(10),
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    // Success or cancel payments url
    success_url: `${req.headers.get(
      'origin'
    )}/payment-result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      'origin'
    )}/payment-result?session_id={CHECKOUT_SESSION_ID}`,
  };
  const checkoutSession = await stripe.checkout.sessions.create(params);

  // return the checkout session details in JSON
  return NextResponse.json(checkoutSession, {
    status: 200,
  });
}
