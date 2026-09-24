import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCustomerDetails } from "@/lib/shopify";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("rootly_customer_token")?.value;

    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const { customer } = await getCustomerDetails(token);

    return NextResponse.json({
      user: customer || null,
      accessToken: customer ? token : null,
    });
  } catch (error) {
    console.error("[Auth ME Error]:", error);
    return NextResponse.json({ user: null });
  }
}
