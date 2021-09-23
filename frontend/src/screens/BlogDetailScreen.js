import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteBlog,
  detailsBlog,
  listBlogs,
} from "../actions/blogActions";
import { Avatar } from '@material-ui/core';
import { red} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import LoadingBox from "../components/LoadingBox";
import moment from "moment";
import { Link } from "react-router-dom";
import { BLOG_COMMENT_CREATE_RESET } from "../constants/blogConstants";
import BlogCardScreen from "./BlogCardScreen";
import FadeIn from "react-fade-in";
import BlogArticle from "../components/BlogArticle";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const useStyles = makeStyles((theme) => ({
  
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[400],
  },
 
}));

const BlogDetailScreen = (props) => {
  const blogId = props.match.params.id;
  const [listComments, setListComments] = useState([]);
  const [message, setMessage] = useState(false);

  const dispatch = useDispatch();

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const blogList = useSelector((state) => state.blogList);
  const { loading: loadingList, error: errorList, blogs } = blogList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const blogDelete = useSelector((state) => state.blogDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = blogDelete;

  const blogCommentCreate = useSelector((state) => state.blogCommentCreate);
  const {
    loading: loadingCommentCreate,
    error: errorCommentCreate,
    success: successCommentCreate,
  } = blogCommentCreate;

  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(createComment(blogId, { comment, name: userInfo.name }));
    } else alert("Please enter comment");
  };

  useEffect(() => {
    dispatch(listBlogs());
    if (!blog || blog._id !== blogId) {
      dispatch(detailsBlog(blogId));
    }
    if (successCommentCreate) {
      // window.alert("Comment Successfully");
      dispatch(detailsBlog(blogId));
      setComment("");
      dispatch({ type: BLOG_COMMENT_CREATE_RESET });
      setMessage(true);
      setInterval(() => {
        setMessage(false);
      }, 7000);
    }

    if (blog) {
      setListComments(blog.comments);
    }

  }, [dispatch, blog, blogId, successCommentCreate]);

  const deleteHandler = (blogId) => {
    dispatch(deleteBlog(blogId));
  };

  const classes = useStyles();
 
  const asideBlog = blogs?.filter((item) => item._id !== blog?._id)

  return (
    <FadeIn>
      <section className="blog-article container">
        <div className="blog-article__container dp-flex">
          <div className="blog-article__content">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <p> {error} </p>
            ) : (
              <BlogArticle blog={blog} />
            )}
            <div>
              <div className="comment">
                <h4>Comments</h4>
                <TransitionGroup className="todo-list">
                  {listComments.map((comment, index) => (
                    <CSSTransition
                      key={index}
                      timeout={500}
                      classNames="comment"
                    >
                      <div key={index} className="comment__container">
                          <div className='comment__info dp-flex'>
                        <Avatar className={classes.red}  alt={`${comment.name}`.toUpperCase()} src={`${comment.picture}`}/>
                          <strong className="comment__name">
                             {comment.name} :
                          </strong>
                          </div>
                        <div className='dp-flex'>
                          <p> {comment.comment} </p>
                        <span className="comment__date">
                          {moment(comment.createdAt).fromNow()}
                        </span>
                        </div>
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div className="form__group">
                    <div
                      className={
                        message ? "comment-message active" : "comment-message"
                      }
                    >
                      <span className="alert alert-success">
                        {" "}
                        Votre message a été publié{" "}
                      </span>
                    </div>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      placeholder="Enter Name"
                      id="comment"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <button className="btn btn--black" type="submit">
                    send
                  </button>
                  <div>
                    {loadingCommentCreate && <LoadingBox></LoadingBox>}
                    {errorCommentCreate && <p> {errorCommentCreate} </p>}
                  </div>
                </form>
              ) : (
                <p>
                  {" "}
                  Please <Link to="/signin">Sign In</Link> to write a comment{" "}
                </p>
              )}
            </div>
           {userInfo && userInfo.isAdmin && (
             <>
            <button
              type="button"
              className="btn btn--green"
              onClick={() => props.history.push(`/product/${blog._id}/edit`)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn--back"
              onClick={() => deleteHandler(blog._id)}
            >
              Delete
            </button>
            </>
            )}
          </div>
          <div className="blog-article__aside">
            <h2 className='heading'>Related Posts</h2>
            {loadingList ? (
              <LoadingBox></LoadingBox>
            ) : errorList ? (
              <p> {errorList} </p>
            ) : (
              <div className="blog-article__container">
                {asideBlog.slice(0, 5).map((blog) => (
                  <BlogCardScreen key={blog._id} blog={blog} large={true} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </FadeIn>
  );
};

export default BlogDetailScreen;
