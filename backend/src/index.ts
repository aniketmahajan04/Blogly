import dotenv from "dotenv";
dotenv.config();

import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { CLIENTID, CLIENTSECRET, PORT } from "./config";

interface GoogleProfile {
    displayName?: string;
}

declare module 'express' {
    interface User {
        displayName?: string;
    }
}

const app = express();
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
    }, (accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) => {
        return done(null, profile);
    })
)

passport.serializeUser((user: Express.User, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));

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
    const user = req.user as GoogleProfile;
    res.send(`Welcome ${user?.displayName || 'User'}`)
})

app.get("/logout", (req, res) => {
    req.logOut(() => {
        res.redirect("/")
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});