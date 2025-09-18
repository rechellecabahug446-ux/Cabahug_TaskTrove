
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !year || !course || !password || !confirmPassword) {
      Alert.alert("⚠️ Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("❌ Passwords do not match");
      return;
    }

    const existingUser = await AsyncStorage.getItem(`user_${email}`);
    if (existingUser) {
      Alert.alert("⚠️ User already exists", "Please log in instead.");
      return;
    }

    const newUser = {
      name,
      email,
      year,
      course,
      password,
    };

    await AsyncStorage.setItem(`user_${email}`, JSON.stringify(newUser));
    await AsyncStorage.setItem("loggedInUser", email); // for profile access

    Alert.alert("✅ Success", "Account created!");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Year (e.g. 3rd Year)" style={styles.input} value={year} onChangeText={setYear} />
      <TextInput placeholder="Course (e.g. BSIT)" style={styles.input} value={course} onChangeText={setCourse} />
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder="Confirm Password" style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#add8e6", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    width: "90%",
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  link: { color: "#333", marginTop: 15 },
});
