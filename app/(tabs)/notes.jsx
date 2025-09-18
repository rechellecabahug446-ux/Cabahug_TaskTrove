import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

export default function Notes() {
  const router = useRouter();

  const [notes, setNotes] = useState([
    "Buy groceries",
    "Finish the project report",
    "Call my best friend",
  ]);

  const [newNote, setNewNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Add new note
  const addNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  // Delete note
  const deleteNote = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };

  // Edit note
  const editNote = (index) => {
    setNewNote(notes[index]);
    setEditingIndex(index);
  };

  // Save edited note
  const saveEdit = () => {
    if (newNote.trim() !== "" && editingIndex !== null) {
      const updated = [...notes];
      updated[editingIndex] = newNote;
      setNotes(updated);
      setNewNote("");
      setEditingIndex(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back to Home Button */}
      <Pressable style={styles.backButton} onPress={() => router.push("/home")}>
        <Text style={styles.backButtonText}>⬅ Back to Home</Text>
      </Pressable>

      <Text style={styles.title}>📝 Notes</Text>

      <TextInput
        style={styles.input}
        placeholder="Write a note..."
        value={newNote}
        onChangeText={setNewNote}
      />

      <View style={styles.buttonContainer}>
        {editingIndex === null ? (
          <Button title="Add Note" onPress={addNote} color="#1a75ff" />
        ) : (
          <Button title="Save Edit" onPress={saveEdit} color="#1a75ff" />
        )}
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.noteText}>{item}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editNote(index)}>
                <Text style={styles.actionText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(index)}>
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
    marginBottom: 10,
    backgroundColor: "#1a75ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a75ff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#1a75ff",
    padding: 10,
    borderRadius: 8,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "#f1f1f1ff",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "50%",
    borderRadius: 8,
    overflow: "hidden",
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
  noteText: {
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
