import React from 'react'
import moment from "moment";
import MDEditor from '@uiw/react-md-editor';


const BlogArticle = ({blog}) => {
    return (
        <div>
        <h1 className='heading'> {blog.title} </h1>
        <div>
          <span>{blog.category}</span>
          <span>{blog.comments.length} comments</span>
          <span>{moment(blog.date).fromNow()} by {blog.author}</span>
        </div>
        <img src={blog.image} alt={blog.title} />
        <MDEditor.Markdown className='blog-article__text' source={blog.text} />
      </div>
    )
}

export default BlogArticle
