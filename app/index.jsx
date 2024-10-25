import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  const [authUser, setAuthUser] = useState(user);
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    CheckNavLoaded();
    setAuthUser(user);
  }, [user]);

  const CheckNavLoaded = () => {
    if (!rootNavigationState.key) return null;
  };

  return (
    user && (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user ? (
          <Redirect href={"/(tabs)/home"} />
        ) : (
          <Redirect href={"/Login"} />
        )}
      </View>
    )
  );
}
