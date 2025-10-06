import CustomText from '@/component/CustomText';
import useTheme from '@/hooks/useTheme';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import useStore from '../../store/useStore';

const ProfileScreen = () => {
  // const { increment,decrement ,count} = useCounter();
  const { count, increment, decrement } = useStore();

  //useState hooks examples
  const [number, setNumber] = useState(0);// for number
  const [color, setColor] = useState('blue'); // for string
   const { theme } = useTheme();
  const [car, setCar] = useState({

  brand: "Ford",
  model: "Mustang",
  year: 1964,
  color: "red"
 });
//  //for object
//  //useEffect hooks examples
// useEffect(() => {
//   console.log("useEffect called");
// }, []);// only once when component is mounted
// useEffect(() => {
//   console.log("number state or color state is changed");
// }, [number, color]);// when number or color state is changed
// useEffect(() => {
//   console.log("car state is changed");
// }, [car]);// when car state is changed

// useEffect(() => {
//   return () => {
//     console.log("component is unmounted");
//   } // when component is unmounted
// });

// useEffect(() => {
//     console.log("component is mounted");
// });// when number state is changed

  const handlePress = () => {
    //Alert.alert('Button Pressed!');
     //setColor('red');
     setCar((prev)=>{
      return { ...prev, color: 'pink' };
  });
  };
// interface Car {
//   brand: string;
//   model: string;
//   year: number;
//   color: string;
// }

// function complexCalculation(num: number): number {
//   console.log("complexCalculation called------------------");   
//   return num * 2;
// }

//   const memoizedValue = useMemo(() => {
//     return complexCalculation(number);
//   }, [number]);

//   console.log("memoizedValue", memoizedValue);



  // const IncrementCount = () => {
  //   //Alert.alert('Button Pressed!');
  //   // setNumber(number + 1);//0+1
  //     // setNumber(number + 1);// increases in counter by 1
  //     // setNumber(number + 1);//1
  //     // setNumber(number + 1);//1
  //     //setNumber((prev)=> prev + 1);
  //    setNumber((prev)=> prev + 1);

  // };
  // const DecrementCount = () => {

  //    setNumber(number - 1);
  //        memoizedValue

  // };
  return (
     <View style={[styles.container, { backgroundColor: theme.background }]}>
    {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap:10 }}> */}
      <CustomText>Number is : {count}</CustomText>
      <CustomText>my {car.brand}</CustomText>
      <CustomText>Its us a {car.color} {car.model} from {car.year}</CustomText>
      <CustomText>My favourite color is : {color}</CustomText>
        <Button
        onPress={handlePress}
        title=" Press Me"
        color="#e47226ff" 
      />
        <Button
        onPress={decrement}
        title=" Decrement Number"
        color="#e47226ff" 
      />
        <Button
        onPress={increment}
        title=" Increment Number"
        color="#e47226ff" 
      />
    </View>
  )
}

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  justifyContent: 'center',
   alignItems: 'center',
    gap:10 
  },  
  link: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
  },
});


