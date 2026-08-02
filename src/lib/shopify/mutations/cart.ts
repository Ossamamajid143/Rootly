export const cartCreateMutation = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
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
