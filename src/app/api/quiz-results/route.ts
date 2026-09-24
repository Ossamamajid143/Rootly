import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { isShopifyConfigured, shopifyFetch } from "@/lib/shopify/client";

interface QuizSubmissionPayload {
  email: string;
  name?: string;
  marketingConsent?: boolean;
  answers: Record<string, unknown>;
  formula?: {
    id: string;
    slug: string;
    title: string;
    matchPercentage?: number;
  };
}

interface ShopifyCustomerCreateResult {
  customerCreate: {
    customer: {
      id: string;
      email: string;
      firstName?: string;
      acceptsMarketing: boolean;
    } | null;
    customerUserErrors: Array<{
      code: string;
      field: string[];
      message: string;
    }>;
  };
}

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        acceptsMarketing
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const DATA_FILE_PATH = path.join(process.cwd(), "data", "quiz-leads.json");

async function persistQuizLead(lead: Record<string, unknown>) {
  try {
    const dataDir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dataDir, { recursive: true });

    let existingLeads: Array<Record<string, unknown>> = [];
    try {
      const fileData = await fs.readFile(DATA_FILE_PATH, "utf-8");
      existingLeads = JSON.parse(fileData);
      if (!Array.isArray(existingLeads)) {
        existingLeads = [];
      }
    } catch {
      existingLeads = [];
    }

    existingLeads.unshift(lead);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(existingLeads, null, 2), "utf-8");
  } catch (error) {
    console.error("[Quiz API] Failed to persist lead to local storage:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuizSubmissionPayload;
    const { email, name, marketingConsent, answers, formula } = body;

    const trimmedEmail = email?.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const consentGiven = Boolean(marketingConsent);
    let shopifyCustomerId: string | null = null;
    let shopifyStatus = "not_configured";
    let shopifyMessage: string | null = null;

    // Only subscribe to promotional emails / create customer in Shopify if configured
    if (isShopifyConfigured()) {
      try {
        const securePassword = `Rootly_${crypto.randomBytes(8).toString("hex")}!Aa9`;

        const response = await shopifyFetch<
          ShopifyCustomerCreateResult,
          {
            input: {
              email: string;
              firstName?: string;
              acceptsMarketing: boolean;
              password: string;
            };
          }
        >({
          query: CUSTOMER_CREATE_MUTATION,
          variables: {
            input: {
              email: trimmedEmail,
              firstName: name?.trim() || undefined,
              acceptsMarketing: consentGiven, // Only true if user explicitly checked consent
              password: securePassword,
            },
          },
          revalidate: 0,
        });

        if (response.customerCreate?.customer) {
          shopifyCustomerId = response.customerCreate.customer.id;
          shopifyStatus = "created";
        } else if (response.customerCreate?.customerUserErrors?.length) {
          const firstError = response.customerCreate.customerUserErrors[0];
          shopifyStatus = firstError.code === "TAKEN" ? "already_exists" : "error";
          shopifyMessage = firstError.message;
        }
      } catch (err) {
        console.error("[Quiz API] Shopify customer creation exception:", err);
        shopifyStatus = "network_error";
        shopifyMessage = err instanceof Error ? err.message : "Unknown error";
      }
    }

    const leadRecord = {
      id: `lead_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
      email: trimmedEmail,
      name: name?.trim() || "",
      marketingConsent: consentGiven,
      shopify: {
        status: shopifyStatus,
        customerId: shopifyCustomerId,
        message: shopifyMessage,
      },
      formula: formula || null,
      answers: answers || {},
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "",
    };

    await persistQuizLead(leadRecord);

    return NextResponse.json({
      success: true,
      message: "Quiz submission recorded successfully.",
      subscribedToMarketing: consentGiven,
      shopify: {
        status: shopifyStatus,
        customerId: shopifyCustomerId,
      },
    });
  } catch (error) {
    console.error("[Quiz API] Submission error:", error);
    return NextResponse.json(
      { error: "Internal server error saving quiz results." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let existingLeads: Array<Record<string, unknown>> = [];
    try {
      const fileData = await fs.readFile(DATA_FILE_PATH, "utf-8");
      existingLeads = JSON.parse(fileData);
    } catch {
      existingLeads = [];
    }

    return NextResponse.json({
      count: existingLeads.length,
      leads: existingLeads.slice(0, 50),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load leads" },
      { status: 500 }
    );
  }
}
