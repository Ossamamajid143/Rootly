export interface CustomerOrder {
  id: string;
  name: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
      };
    }>;
  };
}

export interface CustomerUser {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email: string;
  phone?: string;
  acceptsMarketing?: boolean;
  orders?: {
    edges: Array<{
      node: CustomerOrder;
    }>;
  };
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  acceptsMarketing?: boolean;
}
