import CustomText from '@/component/CustomText';
import { router } from 'expo-router';
import React from 'react';
import { Button, View } from 'react-native';

const AboutScreen = () => {
  return (
   <View style={{ flex: 1, justifyContent: "center", alignItems: "center",gap:10 }}>
         <CustomText> About Screen</CustomText>
   
         <Button title="Go Back" onPress={() => router.back() }   color="#841584"/>
         <Button title="Replace with Home" onPress={() => router.replace("/")}   color="#841584" />
         <Button title="Go to Root" onPress={() => router.dismissAll()}    color="#841584"/>
       </View>
  )
}

export default AboutScreen;