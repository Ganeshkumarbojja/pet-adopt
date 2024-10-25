import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { FlatList } from "react-native";
import UserItem from "../../components/Inbox/UserItem";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetUserList();
  }, [user]);

  // Get user list depends on current user emails
  const GetUserList = async () => {
    setUserList([]);
    setLoader(true);
    const q = query(
      collection(db, "chat"),
      where(
        "userIds",
        "array-contains",
        user?.primaryEmailAddress?.emailAddress
      )
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setUserList((prevList) => [...prevList, doc.data()]);
    });
    setLoader(false);
  };

  // filter the list of other user in one state

  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(
        (user) => user?.email !== user?.primaryEmailAddress?.emailAddress
      );
      const result = {
        docId: record.id,
        ...otherUser[0],
      };
      list.push(result);
    });
    return list;
  };
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>Inbox</Text>
      <FlatList
        data={MapOtherUserList()}
        style={{ marginTop: 20 }}
        onRefresh={GetUserList}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <UserItem userInfo={item} key={index} />
        )}
      />
    </View>
  );
}
