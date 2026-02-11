const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post");

const app = express();
app.use(express.json());

//  MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/postsDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//  GET all posts
app.get("/getPosts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

//  ADD post
app.post("/addPosts", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  await post.save();
  res.json({ message: "Post added successfully", post });
});

//  DELETE post
app.delete("/delPosts/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted successfully" });
});

// UPDATE post
app.patch("/post/:id", async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedPost);
});

// Server start
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
