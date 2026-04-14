const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const users = [
  {
    email: 'john@example.com',
    password: '$2b$10$5Qhupow8z2mJYdN0n8M3UujnWQPKjEc/WWEDuJeayQMZT6X0hgqP2' // SecurePass123!
  }
];

const loginAttempts = new Map(); // email -> { count, firstAttempt, lockUntil }

// Check login attempts
function checkLoginAttempts(email) {
  const attemptData = loginAttempts.get(email);

  if (!attemptData) {
    return { allowed: true };
  }

  const now = Date.now();

  if (attemptData.lockUntil && now < attemptData.lockUntil) {
    const minutesLeft = Math.ceil((attemptData.lockUntil - now) / 60000);
    return {
      allowed: false,
      message: `Account locked. Try again in ${minutesLeft} minute(s).`
    };
  }

  if (attemptData.firstAttempt && now - attemptData.firstAttempt > 60 * 60 * 1000) {
    loginAttempts.delete(email);
    return { allowed: true };
  }

  return { allowed: true };
}

// Record failed attempt
function recordFailedAttempt(email) {
  const now = Date.now();
  const attemptData = loginAttempts.get(email);

  if (!attemptData) {
    loginAttempts.set(email, {
      count: 1,
      firstAttempt: now,
      lockUntil: null
    });
    return;
  }

  if (now - attemptData.firstAttempt > 60 * 60 * 1000) {
    loginAttempts.set(email, {
      count: 1,
      firstAttempt: now,
      lockUntil: null
    });
    return;
  }

  attemptData.count += 1;

  if (attemptData.count >= 5) {
    attemptData.lockUntil = now + 30 * 60 * 1000; // 30 minutes
  }

  loginAttempts.set(email, attemptData);
}

// Clear attempts
function clearAttempts(email) {
  loginAttempts.delete(email);
}

// Login with rate limiting
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const attemptCheck = checkLoginAttempts(email);

    if (!attemptCheck.allowed) {
      return res.status(423).json({ message: attemptCheck.message });
    }

    const user = users.find(u => u.email === email);

    if (!user) {
      recordFailedAttempt(email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      recordFailedAttempt(email);

      const attemptData = loginAttempts.get(email);
      if (attemptData && attemptData.lockUntil) {
        return res.status(423).json({
          message: 'Too many failed attempts. Account locked for 30 minutes.'
        });
      }

      return res.status(401).json({ message: 'Invalid email or password' });
    }

    clearAttempts(email);

    return res.json({
      message: 'Login successful'
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});