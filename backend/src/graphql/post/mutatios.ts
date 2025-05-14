
export const mutations = `#graphql
  createPost(title: String!, body: String!, image: String): String
  updatePost(id: String!, title: String, body: String, image: String): String
  deletePost(postId: String!): String
`
