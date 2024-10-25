import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { FlatList } from "react-native";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    GetSliders();
  }, []);
  const GetSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "sliders"));
    snapshot.forEach((item) => {
      setSliderList((sliderList) => [...sliderList, item.data()]);
    });
  };
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        horizontal={true}
        data={sliderList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles?.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 170,
    borderRadius: 15,
    marginRight: 15,
  },
});
