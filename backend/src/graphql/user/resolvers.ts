import UserService, { 
  UserInterface,
} from "../../services/user";
import PostService, { PostInterface } from "../../services/post"; 

const queries = {
 getUserByToken: async (
   _: any,
   payload: {email: string, password: string}
 ) => {
   const { email, password } = payload;
   const token = await UserService.getUserByToken({ email, password });
   
   return token;
 },

 getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
   
    if(!context && !context.user) {
      // const { id } = context.user;
      // const user = await UserService.getUserById(id);
      // return user;

      throw new Error("Please login");
    }
    const user = await UserService.getUserById(context.user.id)
    if(!user){
      throw new Error("User not found");
    }

    return user;

 }

};

const mutations = {
  createUser: async (_: any, payload: UserInterface) => {
    const res = await UserService.createUser(payload);
      return res.id;
  },

  createPost: async (_: any, payload: PostInterface, context: any) => {
    if(!context && !context.user){
      throw new Error("Unauthorized! please login");
    }

    const { id } = context.user;

    const post = await PostService.createPost(payload, id);
    return "Post successfully created!";
  }
};

export const resolvers = { queries, mutations };
