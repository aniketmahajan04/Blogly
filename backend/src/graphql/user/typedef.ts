
export const typedefs = `#graphql
  type User {
    id: ID!
    name: String
    email: String
    photo: String
    posts: [Post!]!
  }
`;
