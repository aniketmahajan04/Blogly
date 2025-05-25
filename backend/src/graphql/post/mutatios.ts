
export const mutations = `#graphql
  createPost(title: String!, excerpt: String!, category: String!, tag: [String!], body: String!, image: String): String
  updatePost(id: String!, title: String, excerpt: String, category: String, tag: [String], content: String, image: String): String
  deletePost(postId: String!): String
  createComment(postId: String!, body: String!): String
  editComment(commentId: String!, body: String!): String
  deleteComment(commentId: String!): String
  likeBlog(postId: String!): String
  enhanceBlog(content: String!): String
`
