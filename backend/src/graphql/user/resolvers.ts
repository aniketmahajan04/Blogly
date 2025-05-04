
const queries = {};

const mutations = {
  createUser: async (_: any, {
      email, password, name
    }:{
      email: string,
      password: string,
      name: string
    }) => {
      return `${email} and ${name}`
  }
};

export const resolvers = { queries, mutations };
