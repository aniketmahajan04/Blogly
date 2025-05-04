import { ApolloServer } from '@apollo/server';

async function createApolloGraphqlServer() {

  const gqlServer = new ApolloServer({
    //graphql need its own enum 
    typeDefs: `
      enum AuthProvider {
        GOOGLE
        EMAIL
      }

      type Query {
        hello: String
      }
      type Mutation {
        createUser(email: String!, password: String!, name: String!, provider: AuthProvider!): Boolean
        login(email: String!, password: String!): Boolean
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello world!"
      },
      Mutation: {
        createUser: async(_, 
                    {
                      email, 
                      password, 
                      name, 
                      provider
                    }:{
                      email: string, 
                      password: string, 
                      name: string, 
                      provider: AuthProvider
                    }
                  ) => {
                    await prismaClient.user.create({
                      data: {
                        email,
                        password,
                        name,
                        provider
                      }
                    })
                    return true;
                  },
        login: async(_, {email, password}: {email: string, password: string}) => {
          console.log(email, password);;
          return true;
        }
      }
    }
  })

  await gqlServer.start();
  
  return gqlServer;
}

export default createApolloGraphqlServer;
