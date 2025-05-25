import PostService, {
  PostInterface,
  UpdatePostInterface
} from "../../services/post";

const queries = {

  getAllPosts: async (_: any, parameter: any, context: any) => {
    if(!context && !context.user){
      throw new Error("Unauthorized! please login");
    }
    try{
      const posts = await PostService.getAllPosts();
      if(posts.length === 0){
        throw new Error("No blogs found");
      }
      return posts;
    } catch(error){
      console.error("Error fetching posts");
    }
  }

}

const mutations = {
    createPost: async (_: any, payload: PostInterface, context: any) => {
        if(!context || !context.user){
          throw new Error("Unauthorized! please login");
        }

        const { id } = context.user;

        await PostService.createPost(payload, id);
        return "Post successfully created!";
  },

  updatePost: async (_: any, payload: UpdatePostInterface, context: any) => {

    if(!context && !context.user){
      throw new Error("Unauthorized! please login");
    }

    const post = await PostService.getPostById(payload.id);

    if(!post) {
      throw new Error("Post not found");
    }

    await PostService.updatePost(payload.id, payload);
    return "Post successfully updated";
  },

  deletePost: async (_:any, { postId }: { postId: string}, context: any) => {
    if(!context && !context.user){
      throw new Error("Unauthorized! please login");
    }
    const post = await PostService.getPostById(postId);
    if(!post) {
      throw new Error("Post not found!");
    }
    await PostService.deletePost(postId);
    return "Post successfully deleted";
  },

  createComment: async (_: any, {
    postId,
    body
  }: {
    postId: string,
    body: string
  },
    context: any
    ) => {
    if(!context || !context.user)
      throw new Error("Unauthorized! please login");

    const { id } = context.user;

    await PostService.createComment(postId, id, body);
    return "successfully createComment";
  },

  editComment: async (_: any, {
    commentId,
    body
  }: {
    commentId: string,
    body: string
  },
  context: any) => {
    if(!context || !context.user)
      throw new Error("Unauthorized! please login");

    const { id } = context.user;
    const  comment = await PostService.getCommentById(commentId);
    if(!comment)
      throw new Error("Comment not found!");

    if(comment.userId !== id)
      throw new Error("Unauthorized! you are not the owner of this comment");

    await PostService.editComment(commentId, body);
    return "successfully editComment";
  },

  deleteComment: async (_: any, {
    commentId,
  }: {
    commentId: string
  },
    context: any) => {

      if(!context || !context.user)
        throw new Error("Unauthorized! please login");
      const { id } = context.user;

      const comment = await PostService.getCommentById(commentId);
      if(!comment)
        throw new Error("Comment not found!");
      if(comment.userId !== id) {
        throw new Error("Unauthorized! you are not the owner of this commentId");
      }

      await PostService.deleteComment(commentId);
      return "successfully Comment deleted";
    },

    likeBlog: async (_: any, {
      postId
    }: {
      postId: string
    },
     context: any
    ) => {
      if(!context || !context.user)
        throw new Error("Unauthorized! please login");

      const { id } = context.user;
      const post = await PostService.getPostById(postId);

      if(!post)
        throw new Error("Post not found!");

      const like = await PostService.getLikeByPostIdAndUserId(postId, id);
      if(like)
        throw new Error("You already liked this post!");
      await PostService.createLike(postId, id);
      return "successfully liked the post";
    },

    enhanceBlog: async (_: any, { content }: { content: string }, context: any) =>{
      if(!context || !context.user)
        throw new Error("Unauthorized! please login");

      const enhacedContent = await PostService.enhanceBlog(content);
      return enhacedContent;
    },

}

export const resolvers = { queries, mutations };
