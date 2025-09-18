import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

const home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 T A S K T R O V E</Text>
      <Text style={styles.subtitle}>Stay organized, stay productive.</Text>

      {/* 🔲 Grid container */}
      <View style={styles.grid}>
        <Link href="/add" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>➕ Add Task</Text>
          </Pressable>
        </Link>

        <Link href="/reminders" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>⏰ Reminders</Text>
          </Pressable>
        </Link>

        <Link href="/motivation" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>💡 Motivation</Text>
          </Pressable>
        </Link>

        <Link href="/notes" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>📝 Notes</Text>
          </Pressable>
        </Link>

        {/* Added Profile button */}
        <Link href="/profile" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>👤 Profile</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#add8e6", // Light blue
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fffefeff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#fffefeff",
    marginBottom: 30,
  },

  // 🆕 Grid layout
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16, // Optional: React Native 0.71+ only
  },

  // Reuse your existing button style but adapt size
  button: {
    backgroundColor: "#808cf7ff",
    borderRadius: 14,
    width: 140,
    height: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default home;
