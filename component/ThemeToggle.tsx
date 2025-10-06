// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity } from "react-native";
// import {useThemeStore} from "../store/useThemeStore";

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useThemeStore();

//   return (
//     <TouchableOpacity
//       style={[
//         styles.button,
//         { backgroundColor: theme === "light" ? "#333" : "#f5f5f5" },
//       ]}
//       onPress={toggleTheme}
//     >
//       <Ionicons
//         name={theme === "light" ? "moon" : "sunny"}
//         size={24}
//         color={theme === "light" ? "white" : "black"}
//       />
//       <Text
//         style={[
//           styles.text,
//           { color: theme === "light" ? "white" : "black" },
//         ]}
//       >
//         {theme === "light" ? "Dark Mode" : "Light Mode"}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default ThemeToggle;

// const styles = StyleSheet.create({
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 10,
//   },
//   text: {
//     fontWeight: "bold",
//     marginLeft: 8,
//   },
// });


