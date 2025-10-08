// import CustomText from '@/component/CustomText';
// import useTheme from '@/hooks/useTheme';
// import { Link, useRouter } from 'expo-router';
// import { Button, Pressable, StyleSheet, View } from 'react-native';
// import useStore from '../../../store/useStore';



// const  HomeScreen =() =>{
//     const router = useRouter();
//     //   const { count } = useCounter();
//   const { theme } = useTheme();

// const { count } = useStore();

//  const handlePress = () => {
  
//     //Alert.alert('Button Pressed!');
//     //router.navigate("/contact");
//    //router.push('/root/settings/media');

//    router.push("/contact")
//   };
//   return (
      
//      <View style={[styles.container, { backgroundColor: theme.background }]}>

//     {/* // <View style={styles.container}> */}
//       <CustomText>
//         Welcome to Home page
        
//       </CustomText>
//      <CustomText>
//        using utilizing context count value : {count}  
        
//       </CustomText>
//        <Link href={ "/about"}>About Page Using Link</Link>

//        <Link href={"/login"} asChild>
//        <Pressable>
//         <CustomText>
//           Go To Login Page Using link but presable
//         </CustomText>
//        </Pressable>
//        </Link>

//       <Link href="/details" style={styles.link}>
//         Open modal
//       </Link>

//      <Link href="/register" style={styles.link}>
//        Register
//       </Link>
//       <Button
//         onPress={handlePress}
//         title="Contact"
//         color="#841584" // Optional: custom color
//       />
//     </View>
//   );
// }

//  export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap:10
//   },
//   link: {
//     paddingTop: 20,
//     fontSize: 20,
//   },
// });

import CustomText from '@/component/CustomText';
import useTheme from '@/hooks/useTheme';
import { Link, useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useAuthStore } from '../../..//store/authStrore';
import useStore from '../../../store/useStore';

const HomeScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { count } = useStore();
  const user = useAuthStore((state) => state.user);

  const handlePress = () => {
    router.push("/contact");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomText style={styles.title}>🏠 Welcome to Home</CustomText>

      <CustomText style={styles.subtitle}>
        Context Count Value : <CustomText style={styles.highlight}>{count}</CustomText>
      </CustomText>

      {user ? (
        <View style={styles.profileBox}>
          <Image source={{ uri: user.picture }} style={styles.avatar} />
          <CustomText style={styles.name}>{user.name}</CustomText>
          <CustomText style={styles.email}>{user.email}</CustomText>
        </View>
      ) : (
        <CustomText style={styles.noUser}>No user logged in</CustomText>
      )}

      <View style={styles.links}>
        <Link href={"/about"} style={styles.linkBtn}>
          <CustomText style={styles.linkText}>📖 About Page</CustomText>
        </Link>

        <Link href={"/login"} asChild>
          <Pressable style={styles.linkBtn}>
            <CustomText style={styles.linkText}>🔑 Go To Login</CustomText>
          </Pressable>
        </Link>

        <Link href="/details" style={styles.linkBtn}>
          <CustomText style={styles.linkText}>📂 Open Modal</CustomText>
        </Link>

        <Link href="/register" style={styles.linkBtn}>
          <CustomText style={styles.linkText}>📝 Register</CustomText>
        </Link>
      </View>

      <Pressable style={styles.contactBtn} onPress={handlePress}>
        <CustomText style={styles.contactText}>📩 Contact</CustomText>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#f8811f",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  highlight: {
    fontWeight: "bold",
    color: "#f07e3c",
  },
  profileBox: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    width: "90%",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  noUser: {
    fontSize: 16,
    color: "red",
    marginVertical: 10,
  },
  links: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  linkBtn: {
    backgroundColor: "#f8811f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 6,
    width: "90%",
    alignItems: "center",
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  contactBtn: {
    marginTop: 15,
    backgroundColor: "#e06b0b",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  contactText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
