import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // ✅ useRouter from expo-router

export default function AddTask() {
  const router = useRouter(); // ✅ for navigation

  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([
    "Finish Math Homework",
    "Study for Science Quiz",
    "Write English Essay",
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTask = () => {
    if (!task.trim()) {
      Alert.alert("Please enter a task");
      return;
    }
    setTaskList((prev) => [...prev, task.trim()]);
    setTask("");
  };

  const handleDelete = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks.splice(index, 1);
    setTaskList(updatedTasks);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(taskList[index]);
  };

  const handleSaveEdit = () => {
    if (!editingText.trim()) {
      Alert.alert("Please enter a task");
      return;
    }
    const updatedTasks = [...taskList];
    updatedTasks[editingIndex] = editingText.trim();
    setTaskList(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔙 Back to Home button */}
      <Pressable style={styles.backButton} onPress={() => router.push("/home")}>
        <Text style={styles.backButtonText}>⬅ Back to Home</Text>
      </Pressable>

      <Text style={styles.title}>➕ Add New Task</Text>

      <TextInput
        placeholder="Enter your task here"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      {/* 📋 Show the task list */}
      {taskList.length > 0 && (
        <View style={{ width: "90%", marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            📋 Task List
          </Text>

          {taskList.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#a0a8f0ff",
                padding: 12,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              {editingIndex === index ? (
                <>
                  <TextInput
                    value={editingText}
                    onChangeText={setEditingText}
                    style={{
                      borderWidth: 1,
                      borderColor: "#4f4cf5ff",
                      borderRadius: 6,
                      padding: 8,
                      marginBottom: 8,
                    }}
                  />
                  <Pressable
                    onPress={handleSaveEdit}
                    style={{
                      backgroundColor: "#727ee9ff",
                      padding: 8,
                      borderRadius: 6,
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Save
                    </Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Text style={{ fontSize: 16, marginBottom: 8 }}>• {item}</Text>

                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <Pressable
                      onPress={() => handleEdit(index)}
                      style={{
                        backgroundColor: "#c868f1ff",
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 6,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Edit
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => handleDelete(index)}
                      style={{
                        backgroundColor: "#5e3eeeff",
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 6,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Delete
                      </Text>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    backgroundColor: "#4f60f1",
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
  },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#4f60f1ff",
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#808cf7",
    padding: 12,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
