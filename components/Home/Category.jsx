import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { FlatList } from "react-native";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Cats");
  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "categories"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Category
      </Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item?.name);
              category(item?.name);
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 10,
              }}
            >
              <View
                style={[
                  styles.container,
                  selectedCategory === item?.name && styles?.selectedContainer,
                ]}
              >
                <Image
                  source={{ uri: item?.imageUrl }}
                  style={{ width: 80, height: 80, borderRadius: 10 }}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "outfit",
                  color:
                    item?.name === selectedCategory
                      ? Colors.PRIMARY
                      : "#000000",
                }}
              >
                {item?.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.LIGHT_PRIMARY,
    // padding: 10,
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: Colors.PRIMARY,
    alignItems: "center",
    margin: 10,
  },
  selectedContainer: {
    opacity: 0.5,
  },
});
