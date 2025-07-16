const express = require('express');
const app = express();

app.use(express.json());

const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

module.exports = { app };