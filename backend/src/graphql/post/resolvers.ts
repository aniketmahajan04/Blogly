
import PostService, { 
  PostInterface,
  UpdatePostInterface
} from "../../services/post"; 

const queries = {

}

const mutations = {

  createPost: async (_: any, payload: PostInterface, context: any) => {
    if(!context && !context.user){
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
    await PostService.deletePost(postId); 
    return "Post successfully deleted";
  }
}

export const resolvers = { queries, mutations };
