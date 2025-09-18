import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; // ✅ for navigation

export default function Motivation() {
  const router = useRouter(); // ✅ router instance

  const [quotes, setQuotes] = useState([
    "Start where you are. Use what you have. Do what you can.",
    "Small steps every day lead to big results.",
    "Stay consistent, not perfect.",
    "Your future depends on what you do today.",
    "Don’t wait for inspiration. Be the inspiration.",
    "Discipline beats motivation every single time.",
  ]);

  const [quote, setQuote] = useState(quotes[0]);
  const [newQuote, setNewQuote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  const addQuote = () => {
    if (newQuote.trim() !== "") {
      setQuotes([...quotes, newQuote]);
      setNewQuote("");
    }
  };

  const deleteQuote = (index) => {
    const updated = quotes.filter((_, i) => i !== index);
    setQuotes(updated);
    if (quote === quotes[index]) {
      setQuote(updated.length > 0 ? updated[0] : "");
    }
  };

  const editQuote = (index) => {
    setNewQuote(quotes[index]);
    setEditingIndex(index);
  };

  const saveEdit = () => {
    if (newQuote.trim() !== "" && editingIndex !== null) {
      const updated = [...quotes];
      updated[editingIndex] = newQuote;
      setQuotes(updated);
      setNewQuote("");
      setEditingIndex(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Back to Home */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/home")}>
        <Text style={styles.backButtonText}>⬅ Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>💡 Motivation</Text>

      {quote ? (
        <Text style={styles.quote}>"{quote}"</Text>
      ) : (
        <Text style={styles.quote}>No quotes available.</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="New Random Quote" onPress={showRandomQuote} color="#4da6ff" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter a new quote..."
        value={newQuote}
        onChangeText={setNewQuote}
      />

      <View style={styles.buttonContainer}>
        {editingIndex === null ? (
          <Button title="Add Quote" onPress={addQuote} color="#1a75ff" />
        ) : (
          <Button title="Save Edit" onPress={saveEdit} color="#1a75ff" />
        )}
      </View>

      <FlatList
        data={quotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.quoteText}>{item}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editQuote(index)}>
                <Text style={styles.actionText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteQuote(index)}>
                <Text style={styles.actionText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e6f2ff",
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#1a75ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 10,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1a75ff",
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 30,
    color: "#004080",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "50%",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    borderWidth: 1,
    borderColor: "#1a75ff",
    padding: 10,
    borderRadius: 8,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#cce6ff",
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    width: "100%",
  },
  quoteText: {
    flex: 1,
    color: "#004080",
  },
  actions: {
    flexDirection: "row",
    marginLeft: 10,
  },
  actionText: {
    fontSize: 18,
    marginHorizontal: 6,
    color: "#1a75ff",
  },
});
