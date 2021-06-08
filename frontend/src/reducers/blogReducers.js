import {
  BLOG_COMMENT_CREATE_FAIL,
  BLOG_COMMENT_CREATE_REQUEST,
  BLOG_COMMENT_CREATE_SUCCESS,
  BLOG_COMMENT_CREATE_RESET,
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_RESET,
} from "../constants/blogConstants";

export const blogListReducer = (
  state = { loading: true, blogs: [] },
  action
) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return { loading: true };
    case BLOG_DETAILS_SUCCESS:
      return { loading: false, blog: action.payload }; // Ajout de la data de productAction dans le state product
    case BLOG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_REQUEST:
      return { loading: true };
    case BLOG_CREATE_SUCCESS:
      return { loading: false, createblog: action.payload };
    case BLOG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogCommentCreateReducer = (state= {}, action) => {
  switch (action.type) {
    case BLOG_COMMENT_CREATE_REQUEST:
      return { loading: true };
    case BLOG_COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case BLOG_COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_COMMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const blogUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_UPDATE_REQUEST:
      return { loading: true };
    case BLOG_UPDATE_SUCCESS:
      return { loading: false, success: true, };
    case BLOG_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};