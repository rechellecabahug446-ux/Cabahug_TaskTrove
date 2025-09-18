import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      {/* Global status bar */}
      <StatusBar style="auto" />

      {/* Main navigation stack */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Landing Page */}
        <Stack.Screen name="index" />

        {/* Auth Pages */}
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />

        {/* Main App Pages */}
        <Stack.Screen name="home" />
        <Stack.Screen name="folders" />
        <Stack.Screen name="tasks" />
        <Stack.Screen name="reminders" />
        <Stack.Screen name="add" />

        {/* 404 fallback */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}