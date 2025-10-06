// import { router } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';

// import React from 'react';

// import { Platform, StyleSheet, Text, View } from 'react-native';

// const isPresented = router.canGoBack();

// const DetailScreen = () => {
//   return (
//     <View style = {style.container}>
//       <Text>Details</Text>
//        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
//       {/* {isPresented && <Link href ="../">Dissmiss Model</Link>} */}
//     </View>
//   )
// }

// export default DetailScreen;


// const style = StyleSheet.create({
// container:{
//     flex:1,
//     alignItems:'center',
//     justifyContent :'center',
//     backgroundColor:"orange"
// }

// })

import CustomText from '@/component/CustomText';
import { Link, router, } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
const Details = () => {
  const isPresented = router.canGoBack();
  return (
    <View style ={styles.container}>
      <CustomText>Details</CustomText>
      {isPresented && <Link href ="../">Dissmiss Model</Link>}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default Details


const styles = StyleSheet.create({

  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
})