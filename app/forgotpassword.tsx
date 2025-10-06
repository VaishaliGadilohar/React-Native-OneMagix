import CustomText from '@/component/CustomText'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const ForgotPassword = () => {
  return (
    <View style ={styles.container}>
      <CustomText style ={styles.label}>forgot password</CustomText>
       <Link href={"/login"} 
       style={{ color: "#e06b0bff", textAlign: "center" }}>Go To Login Page</Link>
    </View>
  )
}

export default ForgotPassword;
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        alignContent: 'flex-start',
     
    },
    
    label: {
        paddingTop:70,
        fontWeight: "bold",
        fontStyle: "normal",
        fontSize: 25,
        textAlign: "center",
        //marginBottom: 1,
    },
    error: {
        margin: 20,
        textShadowColor: 'red'
    }
   

})