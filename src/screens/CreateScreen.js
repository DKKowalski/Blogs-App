import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostform from "../../components/BlogPostform";

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);

  return (
    <>
      <BlogPostform
        onSubmit={(title, content) => {
          addBlogPost(title, content, () => {
            navigation.navigate("Index");
          });
        }}
      />
    </>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    padding: 5,
    borderColor: "black",
    margin: 5,
  },

  label: { fontSize: 18, marginBottom: 10, marginLeft: 5 },
});
