// import { Ionicons } from "@expo/vector-icons";
// import { Stack } from 'expo-router';
// import React from 'react';
// import { TouchableOpacity } from "react-native";
// import useThemeStore from '../store/useThemeStore';
// // export const unstable_settings = {
// //   initialRouteName: '',
// // };

// const StackLayout = () => {
//   // const router = useRouter();
//   //   const rootNavigation = useRootNavigationState();

//   //   useEffect(() => {
//   //     if (!rootNavigation?.key) return; // wait until router is ready
//   //     router.replace("/login");
//   //   }, [rootNavigation?.key]);

//   const { theme ,toggleTheme } = useThemeStore();

//   return (
//   // <CounterProvider>
//     <Stack
//      screenOptions={{
//         headerStyle: {
//          // backgroundColor: theme === "light" ? "#0ba718ff" : "#f07e3cff",
//            backgroundColor:  "#f07e3cff",

//         },
//      //   headerTintColor: theme === "light" ? "#81e48aff" : "#fff",
//         contentStyle: {
//           backgroundColor: theme === "light" ? "#202016ff": "#fff" ,
//         },
//          headerRight: () => (
//           <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
//             <Ionicons
//               name={theme === "light" ? "moon" : "sunny"}
//               size={24}
//               color={theme === "light" ? "#202016ff" : "#fff"}
//             />
//           </TouchableOpacity>
//         ),
//       }}
//       //screenOptions={{ headerStyle: { backgroundColor: "#f07e3cff" } }}
//       //initialRouteName="login"
//     > 
//       <Stack.Screen name="index" options={{ title: 'Login', headerShown: false }} />
//       <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />

//       <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//       <Stack.Screen name="contact" options={{ title: 'Contact' }} />
//       <Stack.Screen name="about" options={{ title: 'About' }} />
//       <Stack.Screen name="details" options={{ presentation: 'modal', }} />
//       <Stack.Screen name="register" options={{ title: 'Register', headerShown: false }} />
//       <Stack.Screen name="forgotpassword" options={{ title: 'ForgotPassword', headerShown: false }} />

//     </Stack>
// //</CounterProvider>
//   )
// }

// export default StackLayout;


import { useNavigationTheme } from "@/hooks/useNavigationTheme";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "../hooks/useTheme";
import { useThemeStore } from "../store/useThemeStore";

const StackLayout = () => {
  const { theme, isDark } = useTheme(); 
  const toggleTheme = useThemeStore((state) => state.toggleTheme); 
  const { screenOptions } = useNavigationTheme();

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={
            screenOptions
          }
        >
      <Stack.Screen
        name="index"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="contact" options={{ title: "Contact" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
      <Stack.Screen name="details" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="register"
        options={{ title: "Register", headerShown: false }}
      />
      <Stack.Screen
        name="forgotpassword"
        options={{ title: "ForgotPassword", headerShown: false }}
      />
      <Stack.Screen
        name="profileDetail"
        options={{ title: "Profile Detail", headerShown: false }}
      />
    </Stack>
    </GestureHandlerRootView>
  );
};

export default StackLayout;
