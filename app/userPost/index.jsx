import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { FlatList } from "react-native";
import PetListItem from "../../components/Home/PetListItem";
import Colors from "../../constants/Colors";

export default function UserPost() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [userPostList, setUserPostList] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Post",
    });
    user && GetUserPost();
  }, [user]);

  /**
   * used to get user posts
   */
  const GetUserPost = async () => {
    setUserPostList([]);
    setLoader(true);
    const q = query(
      collection(db, "pets"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserPostList((prevList) => [...prevList, doc.data()]);
    });
    setLoader(false);
  };

  const OnDeletePost = (docId) => {
    Alert.alert(
      "Do You Want to Delete?",
      "Do you really want to delete this post",
      [
        {
          text: "Cancel",
          onPress: () => console.log("canceled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePost(docId),
        },
      ]
    );
  };

  const deletePost = async (docId) => {
    await deleteDoc(doc(db, "pets", docId));
    GetUserPost();
  };
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{ fontFamily: "outfit-medium", fontSize: 30, marginBottom: 10 }}
      >
        UserPost
      </Text>
      <FlatList
        data={userPostList}
        onRefresh={GetUserPost}
        numColumns={2}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem key={index} pet={item} />
            <Pressable
              onPress={() => OnDeletePost(item.id)}
              style={{
                backgroundColor: Colors.LIGHT_PRIMARY,
                padding: 5,
                borderRadius: 7,
                marginRight: 10,
              }}
            >
              <Text style={{ fontFamily: "outfit", textAlign: "center" }}>
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />
      {userPostList?.length == 0 && <Text>No posts available</Text>}
    </View>
  );
}
