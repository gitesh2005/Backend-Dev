const express = require('express');
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const app = express();
app.use(express.json());

app.use(session({
  secret: 'passport-secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const JWT_SECRET = 'jwt-secret';

const users = [
  { id: 1, username: 'john', password: '12345' },
  { id: 2, username: 'jane', password: 'abcde' }
];

// Session handling
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user || false);
});

// Local Strategy
passport.use('local', new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const user = users.find(
        u => u.username === username && u.password === password
      );

      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// JWT Strategy
passport.use('jwt', new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  },
  (payload, done) => {
    try {
      const user = users.find(u => u.id === payload.id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

// Session-based login
app.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message || 'Authentication failed'
      });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed' });
      }

      return res.json({
        message: 'Session login successful',
        user: {
          id: user.id,
          username: user.username
        }
      });
    });
  })(req, res, next);
});

// API login returns JWT
app.post('/auth/api-login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message || 'Authentication failed'
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      message: 'API login successful',
      token
    });
  })(req, res, next);
});

// Session auth protected route
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: 'Please login with session auth' });
  }

  res.json({
    message: 'Welcome to dashboard',
    user: req.user
  });
});

// JWT auth protected route
app.get(
  '/api/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      message: 'Profile fetched successfully',
      user: req.user
    });
  }
);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});