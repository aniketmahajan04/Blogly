import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { expressMiddleware } from '@apollo/server/express4';
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { CLIENTID, CLIENTSECRET, PORT } from "./config";
import { prismaClient } from "./lib/db";
import { AuthProvider } from "@prisma/client";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user";

async function init() {

  const app = express();

  app.use(express.json());
  app.use("/graphql",
          expressMiddleware(await createApolloGraphqlServer(), {
            context: async ({ req }) => {
              const token = req.headers["token"] as string | undefined;
              
              try{
                if(!token){
                  return { user: null };
                }
                const user = UserService.decodeJWTToken(token);
                 
                return { user };
              } catch(error) {
                console.log("Authentication error", error);
              }
            }
          }));

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

