import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import MDEditor from "@uiw/react-md-editor";

const BlogCardFullScreen = ({ blog, large }) => {
  return (
    <FadeIn>
      <div className='blog__card--full'>
        <div>
        <Link to={`/blog/${blog._id}`}>
          <img className="img__card" src={blog.image} alt={blog.title} />
        </Link>
        </div>
        <div className='blog__card--content'>
          <strong className="blog__category"> {blog.category} </strong>
        <Link to={`/blog/${blog._id}`}>
          <h4> {blog.title} </h4>
        </Link>
        <MDEditor.Markdown source={`${blog.description.substring(0, 100)} ...`} />
        <p className="small-text-grey"> </p>
        <div className=" blog__info dp-flex">
          <p className="blog__date">
            {moment(blog.date).format("MMM Do, YY")} by {blog.author}
          </p>
        </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default BlogCardFullScreen;
