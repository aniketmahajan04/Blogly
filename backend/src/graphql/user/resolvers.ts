import UserService, { 
  UserInterface,
} from "../../services/user";
import PostService, { 
  PostInterface,
  UpdatePostInterface
} from "../../services/post"; 
//this is change


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
   
    if(!context || !context.user) {
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
};

export const resolvers = { queries, mutations };
