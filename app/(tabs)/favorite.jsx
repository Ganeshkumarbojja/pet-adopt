import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Shared from "../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "../../components/Home/PetListItem";

export default function Favorite() {
  const { user } = useUser();
  // const [favIds, setFavIds] = useState([]);
  const [favPets, setFavPets] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetFavPetIds();
  }, [user]);

  // Fetches fav ids
  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setLoader(false);
    GetFavPetList(result?.favorites);
  };

  // Fetches related pets
  const GetFavPetList = async (favId) => {
    setFavPets([]);
    setLoader(true);

    const q = query(collection(db, "pets"), where("id", "in", favId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      setFavPets((prev) => [...prev, item.data()]); // Add new pet to the array
    });
    setLoader(false);
  };
  return (
    <View style={{ padding: 20, marginTop: 30 }}>
      <Text
        style={{ fontFamily: "outfit-medium", fontSize: 30, marginBottom: 20 }}
      >
        Favorites
      </Text>
      <FlatList
        data={favPets}
        numColumns={2}
        refreshing={loader}
        onRefresh={() => GetFavPetIds()}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
      />
    </View>
  );
}
