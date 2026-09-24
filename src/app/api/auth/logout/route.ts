import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { logoutCustomer } from "@/lib/shopify";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("rootly_customer_token")?.value;

    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (token) {
      await logoutCustomer(token);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete("rootly_customer_token");
    response.cookies.delete("rootly_customer_email");

    return response;
  } catch (error) {
    console.error("[Logout Error]:", error);
    const response = NextResponse.json({ success: true });
    response.cookies.delete("rootly_customer_token");
    response.cookies.delete("rootly_customer_email");
    return response;
  }
}
