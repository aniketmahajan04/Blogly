import { User } from ".";
import UserService, { UserInterface } from "../../services/user";

const queries = {
 getUserByToken: async (_: any, payload: {email: string, password: string} ) => {
   const { email, password } = payload;
   const token = await UserService.getUserByToken({ email, password });
   
   return token;
 }
};

const mutations = {
  createUser: async (_: any, payload: UserInterface) => {
    const res = await UserService.createUser(payload);
      return res.id;
  }
};

export const resolvers = { queries, mutations };
