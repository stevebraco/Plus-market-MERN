import React from "react";
import moment from "moment";
import marked from "marked";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

const BlogCardScreen = ({ blog }) => {
  const renderText = (text) => {
    const __html = marked(text, { sanitize: true });
    return { __html };
  };
  return (
    <FadeIn>
      <div className="blog__card">
        <Link to={`/blog/${blog._id}`}>
          <img className="img__medium" src={blog.image} alt={blog.title} />
        </Link>
        <div className=" blog__info dp-flex">
          <strong className="blog__category"> {blog.category} </strong>{" "}
          <span className="blog__separate">|</span>{" "}
          <p className="blog__date">
            {" "}
            {moment(blog.date).format("MMM Do, YY")}{" "}
          </p>
        </div>
        <Link to={`/blog/${blog._id}`}>
          <h4> {blog.title} </h4>
        </Link>
        <div
          className="rendertext blog__rendertext"
          dangerouslySetInnerHTML={renderText(
            `${blog.text.substring(0, 70)}...`
          )}
        />
        <p className="small-text-grey">by {blog.author} </p>
      </div>
    </FadeIn>
  );
};

export default BlogCardScreen;
