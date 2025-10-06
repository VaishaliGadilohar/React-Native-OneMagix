import CustomText from '@/component/CustomText';
import useTheme from '@/hooks/useTheme';
import React from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';

const SettingScreen = () => {

    const { theme } = useTheme();
  const handlePress = () => {
    Alert.alert('Button Pressed!');
  };
  return (
         <View style={[styles.container, { backgroundColor: theme.background }]}>
    
        <CustomText>Settings</CustomText>
          <Button
          onPress={handlePress}
          title=" Press Me"
          color="#841584" // Optional: custom color
        />
      </View>
  )
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:10
  },
});  
