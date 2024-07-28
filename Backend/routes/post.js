const express = require('express');
const Post = require('../models/postSchema');
const User = require('../models/userSchema');
const auth = require('../middleware/auth'); // Middleware for token verification

const router = express.Router();

// Create Post
router.post('/create', auth, async (req, res) => {
  const { title, content } = req.body;
  
  try {
    const post = new Post({
      title,
      content,
      user: req.user.id
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Read Post
router.post('/read', auth, async (req, res) => {
  const { postId } = req.body;

  try {
    const post = await Post.findById(postId).populate('user', 'fullName');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update Post
router.post('/update', auth, async (req, res) => {
  const { postId, title, content } = req.body;

  try {
    let post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Delete Post
router.post('/delete', auth, async (req, res) => {
  const { postId } = req.body;

  try {
    // Find and delete the post by ID
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is authorized to delete the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;
