
export const typedefs = `#graphql
 
  type Post {
    id: ID!
    title: String
    body: String
    image: String
    userId: String!
    postedAt: String!
    #like: [Like!]!
    #comments: [Comments]!

  }

`
