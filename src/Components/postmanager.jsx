import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual API URL

const PostManager = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/create`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts([...posts, response.data]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const updatePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_BASE_URL}/update`,
        { postId, title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(posts.map(post => post._id === postId ? response.data : post));
      setTitle('');
      setContent('');
      setEditingPostId(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_BASE_URL}/delete`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPostId) {
      updatePost(editingPostId);
    } else {
      createPost();
    }
  };

  return (
    <div>
      <h1>Post Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">
          {editingPostId ? 'Update Post' : 'Create Post'}
        </button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => {
              setEditingPostId(post._id);
              setTitle(post.title);
              setContent(post.content);
            }}>Edit</button>
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostManager;
