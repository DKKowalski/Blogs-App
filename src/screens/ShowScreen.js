import React, { useContext } from "react";
import { Context } from "../context/BlogContext";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";

const ShowScreen = ({ navigation }) => {
  // console.log(navigation.getParam("id"));
  const { state } = useContext(Context);

  const blogPost = state.find((blogPost) => {
    return blogPost.id === navigation.getParam("id");
  });
  return (
    <>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </>
  );
};

export default ShowScreen;
ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", {
            id: navigation.getParam("id"),
          })
        }
      >
        <EvilIcons name="pencil" size={32} color="black" />
      </TouchableOpacity>
    ),
  };
};
const styles = StyleSheet.create({});
