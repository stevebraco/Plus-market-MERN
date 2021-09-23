import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import MDEditor from "@uiw/react-md-editor";

const BlogCardScreen = ({ blog, large }) => {
  return (
    <FadeIn>
      <div className={large ? 'blog__card--large' : 'blog__card'}>
        <Link to={`/blog/${blog._id}`}>
          <img className="img__medium" src={blog.image} alt={blog.title} />
        </Link>
        <div className=" blog__info dp-flex">
          <strong className="blog__category"> {blog.category} </strong>
          <span className="blog__separate">|</span>
          <p className="blog__date">
            {moment(blog.date).format("MMM Do, YY")}
          </p>
        </div>
        <Link to={`/blog/${blog._id}`}>
          <h4> {blog.title} </h4>
        </Link>
        <MDEditor.Markdown source={`${blog.description.substring(0, 70)} ...`} />
        <p className="small-text-grey">by {blog.author} </p>
      </div>
    </FadeIn>
  );
};

export default BlogCardScreen;
