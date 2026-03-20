import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const PRICE_IDS: Record<string, string> = {
  forge: process.env.STRIPE_FORGE_PRICE_ID ?? '',
  genesis: process.env.STRIPE_GENESIS_PRICE_ID ?? '',
  studio: process.env.STRIPE_STUDIO_PRICE_ID ?? '',
};

export async function POST(req: NextRequest) {
  try {
    const { tier, wizardAnswersKey } = await req.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 503 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-02-25.clover',
    });

    const priceId = PRICE_IDS[tier];
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/soulcraft/result?session_id={CHECKOUT_SESSION_ID}&key=${wizardAnswersKey}&tier=${tier}`,
      cancel_url: `${appUrl}/soulcraft/create?tier=${tier}&cancelled=true`,
      metadata: {
        tier,
        wizardAnswersKey: wizardAnswersKey ?? '',
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
