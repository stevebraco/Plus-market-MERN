import React from 'react'
import marked from "marked";


const BlogArticle = ({blog}) => {
    const renderText = (text) => {
        const __html = marked(text, { sanitize: true });
        return { __html };
      };
    return (
        <div>
        <img src={blog.image} />
        <h1> {blog.title} </h1>
        <div
          className="blog-article__rendertext"
          dangerouslySetInnerHTML={renderText(blog.text)}
        />
      </div>
    )
}

export default BlogArticle
