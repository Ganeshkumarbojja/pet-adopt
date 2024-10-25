import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import MarkFav from "../MarkFav";

export default function PetListItem({ pet }) {
  console.log(pet.imageUrl, "image url");
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/petDetails",
          params: pet,
        })
      }
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        marginBottom: 15,
      }}
    >
      <View style={{ position: "absolute", right: 10, top: 10, zIndex: 2 }}>
        <MarkFav pet={pet} color="white" />
      </View>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{
          width: 150,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
      <Text style={{ fontFamily: "outfit-medium", fontSize: 18 }}>
        {pet?.name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
          {pet?.breed}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.PRIMARY,
            borderRadius: 10,
            paddingHorizontal: 7,
            fontSize: 11,
            backgroundColor: Colors.LIGHT_PRIMARY,
          }}
        >
          {pet?.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
}
