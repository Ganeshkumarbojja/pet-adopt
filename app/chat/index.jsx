import { View, Text } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment";

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const { user } = useUser();
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    GetUserDetails();
    const unsubscribe = onSnapshot(
      collection(db, "chat", params?.id, "messages"),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      }
    );
    return () => unsubscribe();
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, "chat", params?.id);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    const otherUser = result?.users.filter(
      (item) => item.email !== user?.primaryEmailAddress?.emailAddress
    );
    console.log(otherUser, "otherUser");
    navigation.setOptions({
      headerTitle: otherUser[0].name,
    });
  };

  const onSend = async (newMessage) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
    newMessage[0].createdAt = moment().format("MM-DD-YYYY HH:mm:ss");
    await addDoc(collection(db, "chat", params.id, "messages"), newMessage[0]);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
