import React, { useState, useReducer } from "react";
import jsonServer from "../api/jsonServer";
import createDataContext from "./createDataContext";

const BlogContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "add_blog_post":
      return [
        ...state,
        {
          content: action.payload.content,
          title: action.payload.title,
          id: Math.floor(Math.random() * 99999),
        },
      ];
    case "delete_blog_post":
      return state.filter((state) => {
        return state.id !== action.payload;
      });
    case "edit_blog_post":
      return state.map((state) => {
        return state.id === action.payload.id ? action.payload : state;
      });
    case "get_blog_posts":
      return action.payload;

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");

    dispatch({
      type: "get_blog_posts",
      payload: response.data,
    });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    // dispatch({ type: "add_blog_post", payload: { title, content } });

    await jsonServer.post("/blogposts", { title, content });
    if (callback) {
      callback();
    }
  };
};
const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blog_post", payload: id });
  };
};
const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({
      type: "edit_blog_post",
      payload: { id, title, content },
    });
    if (callback) {
      callback();
    }
  };
};

// export const BlogProvider = ({ children }) => {
//   const [blogPosts, dispatch] = useReducer(reducer, []);
//   // const [blogPosts, setBlogPosts] = useState([]);

//   // const addBlogPost = () => {
//   //   setBlogPosts([
//   //     ...blogPosts,
//   //     { title: `Blog Post #${blogPosts.length + 1}` },
//   //   ]);
//   // };
//   // const addBlogPost = () => {
//   //   dispatch({ type: "add_blog_post" });
//   // };
//   return (
//     <BlogContext.Provider value={{ data: blogPosts, addBlog: addBlogPost }}>
//       {children}
//     </BlogContext.Provider>
//   );
// };

export const { Context, Provider } = createDataContext(
  reducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
