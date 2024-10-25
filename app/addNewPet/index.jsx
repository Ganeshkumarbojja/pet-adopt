import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { TextInput } from "react-native";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator } from "react-native";

export default function AddNewPet() {
  const { user } = useUser();
  const navigate = useNavigation();
  const [formData, setFormData] = useState({
    category: "Cats",
    sex: "Male",
  });
  const [selectedGender, setSelectedGender] = useState();

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);

  const router = useRouter();
  useEffect(() => {
    navigate.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "categories"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const handleInputChange = (fieldName, filedValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: filedValue }));
    console.log(formData);
  };

  /**
   * used to pick image from gallery
   */
  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    if (Object.keys(formData).length !== 8) {
      ToastAndroid.show("Enter All Details", ToastAndroid.SHORT);
      return;
    }
    UploadImage();
  };

  /**
   * Used to upload pet image to firebase storage
   */
  const UploadImage = async () => {
    setLoader(true);
    const resp = await fetch(image);
    const blobImage = await resp.blob();

    const storageRef = ref(storage, "/petAdopt/" + Date.now() + ".jpg");

    uploadBytes(storageRef, blobImage)
      .then((snapshot) => {
        console.log("file uploaded");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          SaveFormData(downloadUrl);
        });
      });
  };

  const SaveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docId,
    });
    setLoader(false);
    router.replace("/(tabs)/home");
  };
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Pet for adoption
      </Text>
      <Pressable onPress={imagePicker}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              marginVertical: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.PRIMARY,
            }}
          />
        ) : (
          <Image
            source={require("../../assets/images/login.png")}
            style={{
              width: 100,
              height: 100,
              marginVertical: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.PRIMARY,
            }}
          />
        )}
      </Pressable>

      <View style={styles?.inputContainer}>
        <Text style={styles?.label}>Pet Name*</Text>
        <TextInput
          style={styles?.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      <View style={styles?.inputContainer}>
        <Text style={styles?.label}>Pet Category*</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
          style={styles?.input}
        >
          {categoryList.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>

      <View style={styles?.inputContainer}>
        <Text style={styles?.label}>Breed*</Text>
        <TextInput
          style={styles?.input}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>

      <View style={styles?.inputContainer}>
        <Text style={styles?.label}>Age*</Text>
        <TextInput
          style={styles?.input}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>

      <View style={styles?.inputContainer}>
        <Text style={styles?.label}>Gender*</Text>
        <Picker
          selectedValue={selectedGender}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
          style={styles?.input}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles?.inputContainer}>
        <Text style={styles?.label}>Weight*</Text>
        <TextInput
          style={styles?.input}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>

      <View style={styles?.inputContainer}>
        <Text style={styles?.label}>Address*</Text>
        <TextInput
          style={styles?.input}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>

      <View style={styles?.inputContainer}>
        <Text style={styles?.label}>About*</Text>
        <TextInput
          style={styles?.input}
          multiline={true}
          numberOfLines={5}
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>

      <TouchableOpacity
        style={styles?.button}
        onPress={onSubmit}
        disabled={loader}
      >
        {loader ? (
          <ActivityIndicator size={"large"} color={Colors.SECONDARY} />
        ) : (
          <Text style={{ fontFamily: "outfit-medium", textAlign: "center" }}>
            Submit
          </Text>
        )}
      </TouchableOpacity>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderRadius: 7,
    backgroundColor: Colors.WHITE,
    fontFamily: "outfit",
  },
  label: {
    marginBottom: 10,
    fontFamily: "outfit",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
});
