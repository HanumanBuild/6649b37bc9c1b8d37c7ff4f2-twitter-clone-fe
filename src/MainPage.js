import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get(`${process.env.TWITTER_CLONE_BE_URL}/posts`);
    setPosts(response.data);
  };

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`${process.env.TWITTER_CLONE_BE_URL}/posts`, { text: newPost });
    setNewPost("");
    fetchPosts();
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handlePostSubmit} className="mb-8">
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="What's happening?"
          value={newPost}
          onChange={handlePostChange}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Post
        </button>
      </form>
      <div>
        {posts.map(post => (
          <div key={post._id} className="p-4 border-b border-gray-300">
            {post.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;