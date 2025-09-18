import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState("https://randomuser.me/api/portraits/women/68.jpg");
  const [userData, setUserData] = useState({});

  const getUserInfo = async () => {
    const email = await AsyncStorage.getItem("loggedInUser");
    if (!email) return;

    const user = await AsyncStorage.getItem(`user_${email}`);
    if (user) {
      setUserData(JSON.parse(user));
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission denied", "Need gallery access to update profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedInUser");
    Alert.alert("Logged out", "See you again!");
    router.replace("/login");
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.push("/home")}>
        <Text style={styles.backText}>⬅ Back to Home</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <Text style={styles.username}>{userData.name}</Text>

        <Pressable style={styles.changePicButton} onPress={pickImage}>
          <Text style={styles.changePicText}>Change Profile Picture</Text>
        </Pressable>

        <View style={styles.infoBox}>
          <Text style={styles.label}>📧 Email</Text>
          <Text style={styles.value}>{userData.email}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>🎓 Year</Text>
          <Text style={styles.value}>{userData.year}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>📚 Course</Text>
          <Text style={styles.value}>{userData.course}</Text>
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#add8e6",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    zIndex: 1,
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#4a90e2",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  changePicButton: {
    backgroundColor: "#6c63ff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 25,
  },
  changePicText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  logoutButton: {
    backgroundColor: "#e94e4e",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 30,
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
