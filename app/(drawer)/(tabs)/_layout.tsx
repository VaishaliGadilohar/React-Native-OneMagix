import { useNavigationTheme } from '@/hooks/useNavigationTheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
const TabLayout=()=> {
  const { screenOptions } = useNavigationTheme({ showHeader: false });

  return (
    <Tabs 
      screenOptions={
         screenOptions
      }
    > 
      <Tabs.Screen
        name="index"
        options={{
          // headerShown: false ,
          title: 'Home',
          tabBarIcon: ({ color  }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          // headerShown: false ,
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
      
     
    </Tabs>
  );
}
export default TabLayout;