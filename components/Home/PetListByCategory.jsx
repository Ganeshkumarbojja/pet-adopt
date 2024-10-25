import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
  const [petList, setPetList] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    GetPetList("Cats");
  }, []);

  /**
   * used to get pet list on category selection
   * @param {*} category
   */

  const GetPetList = async (category) => {
    setPetList([]);
    setLoader(true);

    const q = query(collection(db, "pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        data={petList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }}
        refreshing={loader}
        onRefresh={() => GetPetList("Cats")}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
      />
    </View>
  );
}
