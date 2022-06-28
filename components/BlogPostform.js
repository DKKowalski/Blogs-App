import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";

const BlogPostform = ({ onSubmit, iniValues }) => {
  const [title, setTitle] = useState(iniValues.title);
  const [content, setContent] = useState(iniValues.content);
  return (
    <View>
      <View>
        <Text style={styles.label}>Enter Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => {
            return setTitle(text);
          }}
        />
        <Text style={styles.label}>Enter Content:</Text>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={(text) => {
            return setContent(text);
          }}
        />
        <Button
          onPress={() => {
            onSubmit(title, content);
            // addBlogPost(title, content, () => {
            //   navigation.navigate("Index");
            // });
          }}
          title="Save"
        />
      </View>
    </View>
  );
};

export default BlogPostform;

BlogPostform.defaultProps = {
  iniValues: {
    title: "",
    content: "",
  },
};

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
