export const cartCreateMutation = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!], $buyerIdentity: CartBuyerIdentityInput) {
    cartCreate(input: { lines: $lines, buyerIdentity: $buyerIdentity }) {
      cart {
        id
        totalQuantity
        checkoutUrl
      }
      userErrors {
        message
      }
    }
  }
`;
