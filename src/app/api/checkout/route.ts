import { NextResponse } from "next/server";
import { createShopifyCheckout } from "@/lib/shopify";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { lines?: Array<{ merchandiseId?: string; quantity?: number }> };
    const lines = (body.lines ?? []).slice(0, 50).flatMap((line) =>
      typeof line.merchandiseId === "string" && Number.isInteger(line.quantity) && Number(line.quantity) > 0
        ? [{ merchandiseId: line.merchandiseId, quantity: Math.min(99, Number(line.quantity)) }]
        : []);

    if (!lines.length) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    const cart = await createShopifyCheckout(lines);
    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout is unavailable." },
      { status: 500 },
    );
  }
}
