import data from "../data.js";
import express from "express";
import Blog from "../models/blogModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utlis.js";

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ _id: -1 });
  try {
    res.send(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  try {
    if (blog) {
      res.send(blog);
    } else {
      res.status(404).send({ message: "Blog Not Found" });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

blogRouter.get("/seed", async (req, res) => {
  // await Blog.remove();
  const createdBlogs = await Blog.insertMany(data.blogs);
  try {
    res.send({ blogs: createdBlogs });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

blogRouter.post("/createblog", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    image: req.body.image,
    text: req.body.text,
    category: req.body.category,
    description: req.body.description,
    author: req.body.author,
  });
  try {
    const createdBlog = await blog.save();
    res.send({
      _id: createdBlog._id,
      title: createdBlog.title,
      image: req.body.image,
      text: req.body.text,
      description: req.body.description,
      category: req.body.category,
      author: req.body.author,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

blogRouter.post(
  "/:id/comments",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      // if (blog.comments.find((x) => x.name === req.user.name)) {
      //   return res
      //     .status(400)
      //     .send({ message: "You already submitted a review" });
      // }
      const comment = {
        name: req.user.name,
        comment: req.body.comment,
      };
      blog.comments.push(comment);
      const updatedBlog = await blog.save();
      res.status(201).send({
        message: "Comment Created",
        comment: updatedBlog.comments[updatedBlog.comments.length - 1],
      });
    } else {
      res.status(404).send({ message: "Blog Not Found" });
    }
  })
);

blogRouter.put('/:id', isAuth, isAdmin, async(req, res) => {
  const blog = await Blog.findById(req.params.id);
  try {
    if(blog) {
    blog.title = req.body.title,
    blog.image = req.body.image,
    blog.text = req.body.text,
    blog.category = req.body.category,
    blog.author = req.body.author;
    blog.description = req.body.description;
    const updatedBlog = await blog.save();
    res.send({ message: "Article Updated", blog: updatedBlog});
    } else {
      res.status(404).send({ message: "Blog Not Found" });

    }
  } catch (error) {
    res.status(404).send({ message: error.message });

  }
})

//delete 
blogRouter.delete('/:id', isAuth, isAdmin, async(req, res) => {
  const blog = await Blog.findById(req.params.id);
  try {
    if(blog) {
      const deleteBlog = await blog.remove();
      res.send({ message : 'Blog Deleted', blog: deleteBlog })
    } else {
      res.status(404).send({ message: 'Blog Not Found' })
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
    
  }
  
})

export default blogRouter;
