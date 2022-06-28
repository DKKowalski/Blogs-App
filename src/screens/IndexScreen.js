import React, { useContext, useEffect } from "react";
import { Text, StyleSheet, Button, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Context } from "../context/BlogContext";
import { EvilIcons } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);
  return (
    <>
      <FlatList
        keyExtractor={(state) => state.title}
        data={state}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                return navigation.navigate("Show", { id: item.id });
              }}
            >
              <View style={css.row}>
                <Text style={css.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <EvilIcons style={css.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default IndexScreen;

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          return navigation.navigate("Create");
        }}
      >
        <EvilIcons name="plus" marginLeft={20} size={32} color="black" />
      </TouchableOpacity>
    ),
  };
};

const css = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  title: { fontSize: 18 },
  icon: { fontSize: 30, fontWeight: "bold" },
});
