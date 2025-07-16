const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Create a new post
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const slug = title.toLowerCase().split(' ').join('-');
    const post = await Post.create({
      title,
      content,
      category,
      slug,
      author: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};
    const posts = await Post.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a post
router.put('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'User not authorized' });
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a post
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'User not authorized' });
    }
    await post.remove();
    res.status(200).json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;