export const typedefs = `#graphql

  type Post {
    id: ID!
    title: String
    excerpt: String
    category: String
    tag: [String!]
    content: String
    image: String
    userId: String!
    postedAt: String!
    author: User!
  }

`
