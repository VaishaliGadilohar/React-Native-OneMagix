import { useNavigationTheme } from "@/hooks/useNavigationTheme";
import { Drawer } from 'expo-router/drawer';
import React from 'react';

const DrawerLayout = () => {
  const { screenOptions } = useNavigationTheme({ showHeader: true });

  return (
   <Drawer 
   
   screenOptions={
      screenOptions }
   >
     <Drawer.Screen
    name = "(tabs)"
    options={{
         // drawerLabel: 'Home',
          title: 'Home',
        }}/>
    <Drawer.Screen 
    name='profile'
    options={{
          drawerLabel: 'Profile',
          title: 'Profile Overview',
        }}
    
    />
     <Drawer.Screen 
    name='getuserpost'
    options={{
          drawerLabel: 'Read User Post',
          title: 'User Post',
        }}
    
    />
      <Drawer.Screen  
    name='postData'
    options={{
          drawerLabel: 'Create Post',
          title: 'Create New Post',
        }}
    />
  
   </Drawer>
  )
}

export default DrawerLayout