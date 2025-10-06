import { useThemeStore } from "@/store/useThemeStore";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import useTheme from "./useTheme";

interface NavigationThemeOptions {
  showHeader?: boolean; 
}

export const useNavigationTheme = (options?: NavigationThemeOptions) => {

 const { theme, isDark } = useTheme();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  return {
    screenOptions: {
      headerShown: options?.showHeader ?? true, 

      headerStyle: {
        backgroundColor: theme.header,
      },
      headerTintColor: theme.text,
     //stack only
      contentStyle: {
        backgroundColor: theme.background,
       
      },
      
      // Drawer only
      drawerContentStyle: {
        backgroundColor: theme.background,
      },

      drawerStyle: { backgroundColor:
         theme.background,
         borderRightWidth: 3,
         borderRightColor: "#d8780aff",
         borderBottomWidth: 1,
         
         width: 260,
        
        },

         drawerActiveTintColor: theme.text,
         drawerInactiveTintColor:  "#d8780aff",
      // Tabs only
      tabBarStyle: {
        backgroundColor: theme.header,
      },
       tabBarActiveTintColor:  theme.text,
       tabBarInactiveTintColor: theme.text + "99",
       headerShadowVisible: true,

      headerRight: () => (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
          <Ionicons
            name={isDark ? "sunny" : "moon"}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
      ),
    },
    theme,
    isDark,
  };
};
