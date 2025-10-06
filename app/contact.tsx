// // import CustomText from "@/component/CustomText";
// // import { apiName } from "@/constants/constant";
// // import { fetchProductData } from "@/services/service";
// // import { router } from "expo-router";
// // import React, { useEffect, useState } from 'react';
// // import { Button, StyleSheet, View } from 'react-native';
// // import { FlatList } from "react-native-gesture-handler";



// // type User = {
// //   id: number;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   address: { city: string; street: string };
// //   company: { name: string };
// // };

// // const ContactScreen = () => {

// //   const [data, setData] = useState([]);

// //   const submitHandler = () =>{
// // router.navigate('./profile')
// //   }
// // const getData = async () => {
// //   try {
// //     const res = await fetchProductData(apiName.getInfo);
// //     setData(res.data);
// //   } catch (error) {
// //     console.log("error fetching data", error);
// //   }
// // };

// //  useEffect(() => {
// //   getData();
// //   }, []);


// //     const renderItem = ({ item }: { item: User }) => (
// //     <View style={styles.card}>
// //       <CustomText style={styles.name}>{item.name}</CustomText>
// //       <CustomText>Email: {item.email}</CustomText>
// //       <CustomText>Phone: {item.phone}</CustomText>
// //       <CustomText>City: {item.address.city}</CustomText>
// //       <CustomText>Company: {item.company.name}</CustomText>
// //     </View>
// //   );

// //   return (
// //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center",gap:10 }}>
// //       <CustomText> Contact Screen</CustomText>

// //       <Button title="Go About" onPress={() => router.push("/about") }   color="#841584"/>
// //       {/* <Button title="Replace with Home" onPress={() => router.replace("/")}   color="#841584" />
// //       <Button title="Go to Root" onPress={() => router.dismissAll()}    color="#841584"/> */}


// //       {/* <Button title = "Click Me" onPress={submitHandler}></Button> */}


// //       <FlatList 
      
// //       data ={data}
// //       renderItem={renderItem}
// //       keyExtractor={item => item.id.toString()}
// //       contentContainerStyle={styles.container}

// //       />
// //     </View>
// //   )
// // }

// // export default ContactScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 16,
// //   },
// //   card: {
// //     backgroundColor: "#f2f2f2",
// //     padding: 12,
// //     borderRadius: 10,
// //     marginBottom: 12,
// //   },
// //   name: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     marginBottom: 4,
// //   },
// // });


// import CustomText from "@/component/CustomText";
// import { apiName } from "@/constants/constant";
// import { fetchProductData } from "@/services/service";
// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   LayoutAnimation,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
//   UIManager,
//   View,
// } from "react-native";

// // Enable animation for Android
// if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   address: { city: string; street: string };
//   company: { name: string };
// };

// const ContactScreen = () => {
//   const [data, setData] = useState<User[]>([]);
//   const [expandedId, setExpandedId] = useState<number | null>(null);

//   const getData = async () => {
//     try {
//       const res = await fetchProductData(apiName.getInfo);
//       setData(res.data);
//     } catch (error) {
//       console.log("error fetching data", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const toggleExpand = (id: number) => {
//     LayoutAnimation.easeInEaseOut(); // smooth expand
//     setExpandedId(prev => (prev === id ? null : id));
//   };

//   const renderItem = ({ item }: { item: User }) => (
//     <View style={styles.card}>
//       {/* Header row with avatar + name + button */}
//       <View style={styles.headerRow}>
//         <View style={styles.avatar}>
//           <CustomText style={styles.avatarText}>
//             {item.name[0]}
//           </CustomText>
//         </View>
//         <CustomText style={styles.name}>{item.name}</CustomText>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => toggleExpand(item.id)}
//         >
//           <CustomText style={styles.buttonText}>
//             {expandedId === item.id ? "Hide" : "View Profile"}
//           </CustomText>
//         </TouchableOpacity>
//       </View>

//       {/* Expanded Details */}
//       {expandedId === item.id && (
//         <View style={styles.details}>
//           <CustomText style={styles.detailText}>📧 {item.email}</CustomText>
//           <CustomText style={styles.detailText}>📱 {item.phone}</CustomText>
//           <CustomText style={styles.detailText}>🏙️ {item.address.city}</CustomText>
//           <CustomText style={styles.detailText}>🏢 {item.company.name}</CustomText>
//         </View>
//       )}
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={styles.container}
//       />
//     </View>
//   );
// };

// export default ContactScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   avatar: {
//     backgroundColor: "#f07e3cff",
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   avatarText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   name: {
//     flex: 1,
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//   },
//   button: {
//     backgroundColor: "#f07e3cff",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "500",
//     fontSize: 14,
//   },
//   details: {
//     marginTop: 12,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     gap: 6,
//   },
//   detailText: {
//     fontSize: 14,
//     color: "#444",
//   },
// });


import CustomText from "@/component/CustomText";
import { apiName } from "@/constants/constant";
import useTheme from "@/hooks/useTheme";
import { fetchProductData } from "@/services/service";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";



type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string; street: string };
  company: { name: string };
};

const ContactScreen = () => {

    const { theme } = useTheme();
  
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetchProductData(apiName.getInfo);
      setData(res.data);
    } catch (error) {
      console.log("error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card }>
      <View style={styles.headerRow}>
        
        <CustomText style={styles.name}>{item.name}</CustomText>

        <TouchableOpacity
          style={styles.button}
          onPress={() => 
            router.push({ pathname: "/profileDetail",
               params: { user: JSON.stringify(item) } })}
        >
          <CustomText style={styles.buttonText}>View Profile</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.View style={styles.bounce}>
          <CustomText style={styles.loadingText}>Loading Users...</CustomText>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.container, {backgroundColor: theme.background}]}
      />
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    backgroundColor: "#f07e3cff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  button: {
    backgroundColor: "#f07e3cff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  bounce: {
    padding: 20,
    backgroundColor: "#f07e3cff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  loadingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
