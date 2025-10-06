// import CustomText from "@/component/CustomText";
// import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useLocalSearchParams } from "expo-router";
// import React from "react";
// import { StyleSheet, TouchableOpacity, View } from "react-native";

// import useTheme from '@/hooks/useTheme';

// type User = {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
//     address: { city: string; street: string };
//     company: { name: string };
// };

// const ProfileDetails = () => {
//     const params = useLocalSearchParams();
//     const user: User = params.user ? JSON.parse(params.user as string) : null;

//     if (!user) {
//         return (
//             <View style={styles.container}>
//                 <CustomText style={styles.errorText}>No user data available</CustomText>
//             </View>
//         );
//     }
//     const { theme } = useTheme();


//     return (

//         <View style={[styles.container, { backgroundColor: theme.background }]}>

//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>

//                 <Ionicons name="person-circle" size={80} color="#fff" />

//                 {/* Name */}
//                 <CustomText style={styles.name}>{user.name}</CustomText>
//             </View>
//             {/* Details Card */}
//             <View style={styles.detailsCard}>
//                 <View style={styles.detailRow}>
//                     <MaterialCommunityIcons name="email-outline" size={20} color="#555" />
//                     <CustomText style={styles.detailText}>{user.email}</CustomText>
//                 </View>
//                 <View style={styles.detailRow}>
//                     <Ionicons name="call-outline" size={20} color="#555" />
//                     <CustomText style={styles.detailText}>{user.phone}</CustomText>
//                 </View>
//                 <View style={styles.detailRow}>
//                     <MaterialCommunityIcons name="city" size={20} color="#555" />
//                     <CustomText style={styles.detailText}>{user.address.city}</CustomText>
//                 </View>
//                 <View style={styles.detailRow}>
//                     <FontAwesome5 name="building" size={18} color="#555" />
//                     <CustomText style={styles.detailText}>{user.company.name}</CustomText>
//                 </View>
//             </View>
//         </View>
//         //   </View>
//     );

// };

// export default ProfileDetails;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//     },
//     header: {
//         width: "100%",
//         // flexDirection: "row",
//         // justifyContent: "space-between",
//         alignItems: "center",
//         backgroundColor: "#f07e3c",
//         // paddingHorizontal: 16,
//         // paddingVertical: 14,
//         height: 180,
//         borderBottomEndRadius: 50,
//         borderBottomStartRadius: 50,
//         // marginBottom: 40,
//         // marginTop:20

//     },
//     headerText: {
//         color: "#fff",
//         fontSize: 18,
//         fontWeight: "600",
//     },
//     avatar: {
//         backgroundColor: "#f07e3c",
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: -40,
//     },
//     avatarText: {
//         color: "#fff",
//         fontSize: 32,
//         fontWeight: "bold",
//     },
//     name: {
//         paddingTop: 20,
//         fontSize: 22,
//         fontWeight: "700",
//         color: "#333",
//         marginVertical: 16,
//     },
//     detailsCard: {
//         width: "90%",
//         backgroundColor: "#fff",
//         padding: 16,
//         borderRadius: 16,
//         shadowColor: "#000",
//         shadowOpacity: 0.08,
//         shadowOffset: { width: 0, height: 4 },
//         shadowRadius: 6,
//         elevation: 5,
//         marginTop: 20,
//     },
//     detailRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 12,
//         gap: 10,
//     },
//     detailText: {
//         fontSize: 16,
//         color: "#444",
//     },
//     errorText: {
//         fontSize: 18,
//         color: "red",
//         fontWeight: "bold",
//     },
//      backButton: {
//     // position: "absolute",
//     // top: 40, // safe margin for status bar
//     left: 20,
//     marginTop:40
//     // zIndex: 10,
//   },
// });
import CustomText from "@/component/CustomText";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import useTheme from "@/hooks/useTheme";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string; street: string };
  company: { name: string };
};

const ProfileDetails = () => {
  const params = useLocalSearchParams();
  const user: User = params.user ? JSON.parse(params.user as string) : null;

  if (!user) {
    return (
      <View style={styles.container}>
        <CustomText style={styles.errorText}>No user data available</CustomText>
      </View>
    );
  }

  const { theme } = useTheme();
  const iconColor = "#f07e3c"; // Orange icons

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Ionicons name="person-circle" size={100} color="#fff" style={{ marginTop: 60 }} />
        <CustomText style={styles.name}>{user.name}</CustomText>
      </View>

      {/* Details Cards */}
      <View style={styles.detailsContainer}>
        {/* Email */}
        <View style={styles.detailCard}>
          <MaterialCommunityIcons name="email-outline" size={28} color={iconColor} />
          <CustomText style={styles.detailText}>{user.email}</CustomText>
        </View>

        {/* Phone */}
        <View style={styles.detailCard}>
          <Ionicons name="call-outline" size={28} color={iconColor} />
          <CustomText style={styles.detailText}>{user.phone}</CustomText>
        </View>

        {/* City */}
        <View style={styles.detailCard}>
          <MaterialCommunityIcons name="city" size={28} color={iconColor} />
          <CustomText style={styles.detailText}>{user.address.city}</CustomText>
        </View>

        {/* Company */}
        <View style={styles.detailCard}>
          <FontAwesome5 name="building" size={26} color={iconColor} />
          <CustomText style={styles.detailText}>{user.company.name}</CustomText>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f07e3c",
    height: 220,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    paddingBottom: 20,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  name: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 16,
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",      // Row layout
    alignItems: "center",      // Center vertically
    gap: 16,                   // Space between icon & text
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
});
