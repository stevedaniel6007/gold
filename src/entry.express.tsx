import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import compression from 'compression';

// Directories where the static assets are located
const distDir = join(fileURLToPath(import.meta.url), '..', '..', 'dist');
const buildDir = join(distDir, 'build');
import session from 'express-session';

// Allow for dynamic port
const PORT = process.env.PORT ?? 3000;

// Create the Qwik City express middleware
const { router, notFound } = createQwikCity({ render, qwikCityPlan });

// Create the express server
// https://expressjs.com/
const app = express();

// Enable gzip compression
app.use(compression());

// Static asset handlers
// https://expressjs.com/en/starter/static-files.html
app.use(`/build`, express.static(buildDir, { immutable: true, maxAge: '1y' }));
app.use(express.static(distDir, { redirect: false }));

// Use Qwik City's page and endpoint request handler
app.use(router);

// Use Qwik City's 404 handler
app.use(notFound);
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

// Start the express server
app.listen(PORT, () => {
  /* eslint-disable */
  console.log(`Server starter: http://localhost:${PORT}/`);
});


import passport from 'passport';
var userProfile: any;

app.use(passport.initialize());
app.use(passport.session());


app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user: any, cb: (arg0: null, arg1: any) => void) {
  cb(null, user);
});

passport.deserializeUser(function(obj: any, cb: (arg0: null, arg1: any) => void) {
  cb(null, obj);
});
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
const GOOGLE_CLIENT_ID = '557949322894-aso8obqfqss15jtimjbv2m7h7mev27di.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });