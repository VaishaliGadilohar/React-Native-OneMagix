import CustomText from '@/component/CustomText';
import useTheme from '@/hooks/useTheme';
import { Link, useRouter } from 'expo-router';
import { Button, Pressable, StyleSheet, View } from 'react-native';
import useStore from '../../../store/useStore';



const  HomeScreen =() =>{
    const router = useRouter();
    //   const { count } = useCounter();
  const { theme } = useTheme();

const { count } = useStore();

 const handlePress = () => {
  
    //Alert.alert('Button Pressed!');
    //router.navigate("/contact");
   //router.push('/root/settings/media');

   router.push("/contact")
  };
  return (
      
     <View style={[styles.container, { backgroundColor: theme.background }]}>

    {/* // <View style={styles.container}> */}
      <CustomText>
        Welcome to Home page
        
      </CustomText>
     <CustomText>
       using utilizing context count value : {count}  
        
      </CustomText>
       <Link href={ "/about"}>About Page Using Link</Link>

       <Link href={"/login"} asChild>
       <Pressable>
        <CustomText>
          Go To Login Page Using link but presable
        </CustomText>
       </Pressable>
       </Link>

      <Link href="/details" style={styles.link}>
        Open modal
      </Link>

     <Link href="/register" style={styles.link}>
       Register
      </Link>
      <Button
        onPress={handlePress}
        title="Contact"
        color="#841584" // Optional: custom color
      />
    </View>
  );
}

 export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:10
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
