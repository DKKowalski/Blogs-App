import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostform from "../../components/BlogPostform";
import { NavigationContext } from "react-navigation";
const EditScreen = ({ navigation }) => {
  const { state, editBlogPost } = useContext(Context);
  const id = navigation.getParam("id");
  const blogPost = state.find((blogPost) => blogPost.id === id);

  return (
    <View>
      <BlogPostform
        iniValues={{ title: blogPost.title, content: blogPost.content }}
        onSubmit={(title, content) => {
          editBlogPost(id, title, content, () => navigation.pop());
        }}
      />
    </View>
  );
};

export default EditScreen;
const css = StyleSheet.create({});
