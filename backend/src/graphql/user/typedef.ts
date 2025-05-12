
export const typedefs = `#graphql
  type User {
    id: ID!
    name: String
    email: String
    photo: String
  }

  type Post {
    id: ID!
    title: String
    body: String
    image: String
    # Add other fields if needed (e.g., createdAt, author, etc.)
  }

`;
