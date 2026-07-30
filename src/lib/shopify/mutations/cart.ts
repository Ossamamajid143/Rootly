export const cartCreateMutation = /* GraphQL */ `
  mutation CartCreate {
    cartCreate {
      cart {
        id
        totalQuantity
      }
      userErrors {
        message
      }
    }
  }
`;
