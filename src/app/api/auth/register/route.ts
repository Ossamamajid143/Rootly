import { NextResponse } from "next/server";
import { createCustomerAccount } from "@/lib/shopify";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
      acceptsMarketing?: boolean;
    };

    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const acceptsMarketing = Boolean(body.acceptsMarketing);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
    }

    const result = await createCustomerAccount({
      email,
      password,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      acceptsMarketing,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const response = NextResponse.json({
      success: true,
      user: result.customer,
      accessToken: result.accessToken,
      expiresAt: result.expiresAt,
    });

    if (result.accessToken) {
      response.cookies.set("rootly_customer_token", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      response.cookies.set("rootly_customer_email", email, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch (error) {
    console.error("[Register API Error]:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Account registration failed." },
      { status: 500 }
    );
  }
}
