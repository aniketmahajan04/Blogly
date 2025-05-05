import UserService, { UserInterface } from "../../services/user";

const queries = {};

const mutations = {
  createUser: async (_: any, payload: UserInterface) => {
    const res = await UserService.createUser(payload);
      return res.id;
  }
};

export const resolvers = { queries, mutations };
