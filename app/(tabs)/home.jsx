import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/Home/PetListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <Header />
      <Slider />
      <PetListByCategory />
      <Link href={"/addNewPet"} style={styles?.addNewPetContainer}>
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
            fontSize: 18,
          }}
        >
          Add New Pet
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.PRIMARY,
    gap: 10,
    padding: 20,
    marginTop: 20,
  },
});
