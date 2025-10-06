import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomDrawer = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Header / Profile Section */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={60} color="#fff" />
        <Text style={styles.username}>Vaishali</Text>
      </View>

      {/* Default Drawer Items */}
      <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer / Extra Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="settings-outline" size={20} color="#333" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="log-out-outline" size={20} color="#333" />
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f07e3c",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    marginTop: 8,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  footerText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
});
