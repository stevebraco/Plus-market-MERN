import React from 'react'
import MDEditor from '@uiw/react-md-editor';


const BlogArticle = ({blog}) => {
    // 
    return (
        <div>
        <img src={blog.image} />
        <h1 className='blog-article__heading'> {blog.title} </h1>
        <MDEditor.Markdown className='blog-article__text' source={blog.text} />
      </div>
    )
}

export default BlogArticle
