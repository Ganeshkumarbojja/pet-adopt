import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OwnerInfo() {
  return (
    <View style={styles?.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s",
          }}
          style={{ width: 60, height: 60, borderRadius: 99 }}
        />
        <View>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
            Ganesh Bojja
          </Text>
          <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
            Pet Owner
          </Text>
        </View>
      </View>
      <Ionicons name="send" size={24} color={Colors.PRIMARY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    padding: 10,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
  },
});
