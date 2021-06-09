import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    text: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: new Date() },
    category: { type: String, required: true },
    author: { type: String, required: true },
    comments: [commentSchema],
  },
  {
    timestamp: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
