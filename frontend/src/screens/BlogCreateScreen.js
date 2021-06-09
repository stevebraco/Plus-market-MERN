import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../actions/blogActions";
import Axios from 'axios'
import LoadingBox from "../components/LoadingBox";
import FadeIn from "react-fade-in";
import MDEditor from '@uiw/react-md-editor';





const BlogCreateScreen = () => {
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState(userInfo.name)

  

   

    const dispatch = useDispatch()

    const clear = () => {
      setTitle('')
      setImage('')
      setText('')
      setCategory('')
      setDescription('')
    }
    
  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(createBlog(title, image, text, category, author, description ));
      clear()
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  
  return (
    <FadeIn>
      <section className="container">
      <form  onSubmit={submitHandler}>
        <div>
          <h1 className="heading">create article</h1>
        </div>
        <div className="form__group">
          <label htmlFor="title">title</label>
          <input
            type="text"
            placeholder="Enter Title"
            id="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form__group">
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div className="form__group">
              <label htmlFor="imageFile">Image File</label>
              <input
                id="imageFile"
                type="file"
                placeholder="choose image"
                onChange={uploadFileHandler}
              ></input>
               {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <p>{errorUpload}</p>
              )}
            </div>
            <div className="form__group">
          <label htmlFor="category">category</label>
          <input
            type="text"
            placeholder="Enter category"
            id="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="description">description</label>
          <input
            type="text"
            placeholder="Enter description"
            id="description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="form__group">
          <input
            type="hidden"
            placeholder="Enter Author"
            value={author}
            id="author"
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form__group">
      <MDEditor
        value={text}
        onChange={setText}
      />
        </div>
        
        <button className="btn" type="submit">
                create article
              </button>
      </form>
          
      </section>

    </FadeIn>
  );
};

export default BlogCreateScreen;
