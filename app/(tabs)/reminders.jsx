import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

export default function Reminders() {
  const router = useRouter();

  const [reminder, setReminder] = useState("");
  const [time, setTime] = useState(new Date());
  const [showAddTimePicker, setShowAddTimePicker] = useState(false);

  const [reminderList, setReminderList] = useState(
    [
      { text: "Study for Math Test", time: new Date().setHours(19, 0, 0, 0) },
      { text: "Finish Science Project", time: new Date().setHours(9, 0, 0, 0) },
      { text: "Submit English Essay", time: new Date().setHours(16, 30, 0, 0) },
      { text: "Meeting with Groupmates", time: new Date().setHours(13, 0, 0, 0) },
      { text: "Review History Notes", time: new Date().setHours(20, 0, 0, 0) },
    ].map((item) => ({
      text: item.text,
      time: new Date(item.time),
    }))
  );

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingTime, setEditingTime] = useState(new Date());
  const [showEditTimePicker, setShowEditTimePicker] = useState(false);

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleAddReminder = () => {
    if (!reminder.trim()) {
      Alert.alert("Please enter a reminder");
      return;
    }
    const newReminder = { text: reminder.trim(), time };
    setReminderList((prev) => [...prev, newReminder]);
    setReminder("");
    setTime(new Date());
  };

  const handleDelete = (index) => {
    const updated = [...reminderList];
    updated.splice(index, 1);
    setReminderList(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(reminderList[index].text);
    setEditingTime(reminderList[index].time);
  };

  const handleSaveEdit = () => {
    if (!editingText.trim()) {
      Alert.alert("Please enter a reminder");
      return;
    }
    const updated = [...reminderList];
    updated[editingIndex] = { text: editingText.trim(), time: editingTime };
    setReminderList(updated);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back to Home Button */}
      <Pressable style={styles.backButton} onPress={() => router.push("/home")}>
        <Text style={styles.backButtonText}>⬅ Back to Home</Text>
      </Pressable>

      <Text style={styles.title}>⏰ Reminders</Text>

      <TextInput
        placeholder="What do you need to do?"
        value={reminder}
        onChangeText={setReminder}
        style={styles.input}
      />

      <Pressable
        onPress={() => setShowAddTimePicker(true)}
        style={styles.timeButton}
      >
        <Text style={styles.timeButtonText}>🕒 Set Time: {formatTime(time)}</Text>
      </Pressable>

      {showAddTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedTime) => {
            setShowAddTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      <Pressable style={styles.addButton} onPress={handleAddReminder}>
        <Text style={styles.addButtonText}>Add Reminder</Text>
      </Pressable>

      {reminderList.length > 0 && (
        <View style={styles.listWrapper}>
          <Text style={styles.subtitle}>📋 Your Reminders</Text>

          {reminderList.map((item, index) => (
            <View key={index} style={styles.reminderBox}>
              {editingIndex === index ? (
                <>
                  <TextInput
                    value={editingText}
                    onChangeText={setEditingText}
                    style={styles.editInput}
                  />

                  <Pressable
                    onPress={() => setShowEditTimePicker(true)}
                    style={styles.timeButton}
                  >
                    <Text style={styles.timeButtonText}>
                      🕒 Edit Time: {formatTime(editingTime)}
                    </Text>
                  </Pressable>

                  {showEditTimePicker && (
                    <DateTimePicker
                      value={editingTime}
                      mode="time"
                      is24Hour={false}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selectedTime) => {
                        setShowEditTimePicker(false);
                        if (selectedTime) setEditingTime(selectedTime);
                      }}
                    />
                  )}

                  <Pressable style={styles.saveBtn} onPress={handleSaveEdit}>
                    <Text style={styles.saveText}>Save</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Text style={styles.reminderText}>
                    • {item.text} - 🕒 {formatTime(item.time)}
                  </Text>

                  <View style={styles.actionRow}>
                    <Pressable
                      style={styles.editBtn}
                      onPress={() => handleEdit(index)}
                    >
                      <Text style={styles.editText}>Edit</Text>
                    </Pressable>

                    <Pressable
                      style={styles.deleteBtn}
                      onPress={() => handleDelete(index)}
                    >
                      <Text style={styles.deleteText}>Delete</Text>
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
  container: { flexGrow: 1, alignItems: "center", padding: 20 },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    backgroundColor: "#4f60f1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  backButtonText: { color: "white", fontWeight: "bold" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#1368d6ff",
    borderRadius: 10,
    marginBottom: 15,
  },
  timeButton: {
    backgroundColor: "#ebd5d5ff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  timeButtonText: {
    fontWeight: "600",
    color: "#0c44ddff",
  },
  addButton: {
    backgroundColor: "#808cf7",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "white", fontWeight: "bold" },
  listWrapper: {
    width: "100%",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reminderBox: {
    backgroundColor: "#a2a8daff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 16,
    marginBottom: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  editBtn: {
    backgroundColor: "#c35ef1ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "#7c38e9ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveBtn: {
    backgroundColor: "#808cf7",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});
