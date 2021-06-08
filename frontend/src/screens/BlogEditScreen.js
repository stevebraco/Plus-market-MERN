import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsBlog, updateBlog } from "../actions/blogActions";
import Axios from 'axios'
import LoadingBox from "../components/LoadingBox";
import { BLOG_UPDATE_RESET } from "../constants/blogConstants";
import FadeIn from "react-fade-in";


const BlogEditScreen = (props) => {
  const blogId = props.match.params.id;

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  const dispatch = useDispatch();

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = blogUpdate;

  useEffect(() => {
    if (successUpdate) {
        props.history.push(`/blog/${blogId}`);
      }

    if (!blog || blog._id !== blogId || successUpdate) {
        dispatch({ type: BLOG_UPDATE_RESET })
      dispatch(detailsBlog(blogId));
    } else {
      setTitle(blog.title);
      setImage(blog.image);
      setText(blog.text);
      setCategory(blog.category);
      setAuthor(blog.author);
    }
  }, [dispatch, blog, blogId, successUpdate, props.history]);

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBlog({
        _id: blogId,
        title,
        image,
        text,
        category,
        author,
      })
    );
  };
  console.log(blog);

  return (
    <FadeIn>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="heading">update article</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <p> {errorUpdate} </p>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <p> {error} </p>
        ) : (
            <>
        <div className="form__group">
          <label htmlFor="title">title</label>
          <input
            type="text"
            placeholder="Enter Title"
            id="title"
            value={title || ""}
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
            value={image || ""}
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
          {loading && <LoadingBox></LoadingBox>}
          {error && <p>{error}</p>}
        </div>
        <div className="form__group">
          <label htmlFor="text">text</label>
          <textarea
            type="text"
            value={text || ""}
            placeholder="Enter Title"
            id="text"
            required
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="category">category</label>
          <input
            type="text"
            placeholder="Enter category"
            id="category"
            value={category || ""}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="category">author</label>
          <input
            disabled
            type="text"
            placeholder="Enter Author"
            value={author || ""}
            id="author"
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          update article
        </button>
        </>
            )}
      </form>
    </FadeIn>
  );
};

export default BlogEditScreen;
