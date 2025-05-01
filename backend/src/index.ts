import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { CLIENTID, CLIENTSECRET, PORT } from "./config";
import type { RequestHandler } from "express";
import { prismaClient } from "./lib/db";
import { AuthProvider } from "@prisma/client";
import { prototype } from "stream";

async function init() {

  interface GoogleProfile {
      displayName?: string;
  }

  // declare module 'express' {
  //     interface User {
  //         displayName?: string;
  //     }
  // }

  const app = express();

  const server = new ApolloServer({
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
                  }
      }
    }
  })

  app.use(express.json());
  await server.start();
  app.use("/graphql",
          (expressMiddleware(server, {
            context: async ({req}) => {
              
              return {}
            }
          }) as unknown) as RequestHandler);

  app.use(
      session({
          secret: "secret",
          resave: false,
          saveUninitialized: true
        })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
      new GoogleStrategy({
          clientID: CLIENTID,
          clientSecret: CLIENTSECRET,
          callbackURL: "http://localhost:3000/auth/google/callback"      
      },async (accessToken: any, refreshToken: any, profile: any, done: (error: Error | null, user: any) => void) => {
            try {
              // console.log(profile._json);
              const { name, email } = profile._json;

              if(!email){
                return done(new Error("No email found in Google profile"), null);
              }

              let user = await prismaClient.user.findUnique({
                where: {
                  email: email
                }
              })

              if(!user) {
                user = await prismaClient.user.create({
                  data: {
                    email,
                    name,
                    provider: AuthProvider.GOOGLE
                  }
                })
              }
              return done(null, user);
            } catch (error) {
              console.error("Error in Google Strategy:", error);
            }
          return done(null, profile);
      })
  )

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser( async (id: string, done) => {
    try{
      const user = await prismaClient.user.findUnique({
        where: {
          id: id,
        }
      })
      done(null, user);
    } catch (error) {
      console.error("Error deserializing user:", error);
      done(error, null);
    }
  });

  app.get("/", (req, res) => {
      res.send("<a href='/auth/google'>Login with google</a>");
  });

  app.get("/auth/google", passport.authenticate('google', { 
      scope: ["profile", "email"]
  }));

  app.get("/auth/google/callback", 
    passport.authenticate('google', {failureRedirect: "/"}),
      (req, res) => {
          res.redirect("/profile");
        }
  )

  app.get("/profile", (req, res) => {
    if(!req.isAuthenticated()){
      return res.redirect("/");
    }
      const user = req.user as any;
      res.send(`Welcome ${user?.name || 'User'}`)
  })

  app.get("/logout", (req, res) => {
      req.logOut(() => {
          res.redirect("/")
      });
  })


  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });

}
init().catch((error) => {
  console.error("Error initializing server:", error);
});
