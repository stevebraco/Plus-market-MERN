import Axios from "axios";
import {
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_DETAILS_SUCCESS,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAIL,
  BLOG_COMMENT_CREATE_REQUEST,
  BLOG_COMMENT_CREATE_SUCCESS,
  BLOG_COMMENT_CREATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_UPDATE_FAIL,
} from "../constants/blogConstants";

export const listBlogs = () => async (dispatch) => {
  dispatch({ type: BLOG_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/blogs");
    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BLOG_LIST_FAIL, payload: error.message });
  }
};

export const detailsBlog = (blogId) => async (dispatch) => {
  dispatch({ type: { BLOG_DETAILS_REQUEST, payload: blogId } });
  try {
    const { data } = await Axios.get(`/api/blogs/${blogId}`);
    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBlog = (title, image, text, category, author, description) => async (dispatch) => {
    dispatch({
      type: BLOG_CREATE_REQUEST,
      payload: { title, image, text, category, author, description },
    });
    try {
      const { data } = await Axios.post("/api/blogs/createblog", {
        title,
        image,
        text,
        category,
        author,
        description,
      });
      dispatch({ type: BLOG_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BLOG_CREATE_FAIL, error: message });
    }
  };

export const createComment = (blogId, comment) => async (dispatch, getState) => {
    dispatch({ type: BLOG_COMMENT_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/blogs/${blogId}/comments`,
        comment,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: BLOG_COMMENT_CREATE_SUCCESS, payload: data.comment });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BLOG_COMMENT_CREATE_FAIL, payload: message });
    }
  };

  export const updateBlog = (blog) => async (dispatch, getState) => {
    dispatch({ type: BLOG_UPDATE_REQUEST, payload: blog })
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(`/api/blogs/${blog._id}`, blog, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      dispatch({ type: BLOG_UPDATE_SUCCESS, payload: data })
    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BLOG_UPDATE_FAIL, error: message });
    }
  }
