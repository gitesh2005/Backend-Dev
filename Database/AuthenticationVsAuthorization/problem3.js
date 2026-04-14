const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
  secret: 'auth-secret',
  resave: false,
  saveUninitialized: false
}));

const users = [
  { id: 1, username: 'user1', role: 'user' },
  { id: 2, username: 'mod1', role: 'moderator' },
  { id: 3, username: 'admin1', role: 'admin' }
];

const posts = [];

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized. Please login first.' });
  }
  next();
};

// Role-based authorization middleware
const requireRole = (role) => {
  const roleHierarchy = {
    user: 1,
    moderator: 2,
    admin: 3
  };

  return (req, res, next) => {
    const userRole = req.session.user.role;

    if (roleHierarchy[userRole] >= roleHierarchy[role]) {
      return next();
    }

    return res.status(403).json({ message: 'Forbidden. Insufficient permissions.' });
  };
};

// Ownership or moderator/admin check
const isOwnerOrModerator = (req, res, next) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  req.post = post;

  const currentUser = req.session.user;

  if (
    post.userId === currentUser.id ||
    currentUser.role === 'moderator' ||
    currentUser.role === 'admin'
  ) {
    return next();
  }

  return res.status(403).json({ message: 'Forbidden. You cannot edit this post.' });
};

// Dummy login route for testing
app.post('/login', (req, res) => {
  const { username } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  req.session.user = user;

  res.json({
    message: 'Logged in successfully',
    user
  });
});

// Create post
app.post('/posts', isAuthenticated, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    userId: req.session.user.id
  };

  posts.push(newPost);

  res.status(201).json({
    message: 'Post created successfully',
    post: newPost
  });
});

// Edit post
app.put('/posts/:id', isAuthenticated, isOwnerOrModerator, (req, res) => {
  const { title, content } = req.body;

  if (title) req.post.title = title;
  if (content) req.post.content = content;

  res.json({
    message: 'Post updated successfully',
    post: req.post
  });
});

// Delete post
app.delete('/posts/:id', isAuthenticated, requireRole('moderator'), (req, res) => {
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === postId);

  if (index === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts.splice(index, 1);

  res.json({ message: 'Post deleted successfully' });
});

// Admin-only user management example
app.get('/users', isAuthenticated, requireRole('admin'), (req, res) => {
  res.json({ users });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});