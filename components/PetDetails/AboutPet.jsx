import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(true);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        About {pet?.name}
      </Text>
      <Text
        style={{ fontFamily: "outfit", fontSize: 14, color: Colors.GRAY }}
        numberOfLines={readMore ? 3 : 20}
      >
       {pet?.about}
      </Text>
      {readMore && (
        <Pressable onPress={() => setReadMore(false)}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              color: Colors.SECONDARY,
              fontSize: 14,
            }}
          >
            Read More
          </Text>
        </Pressable>
      )}
    </View>
  );
}
