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
    comments: Comments
  }
    type Comments {
    id: ID!
    body: String!
    postId: String!
    userId: String!
    commentedAt: String!
  }
`;
