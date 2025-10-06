
// const LoginScreen = () => {
//     return (
//         <View>
//             <Link href="/about">About</Link>
//             <Link dismissTo href={"/contact"}>Close modal</Link>
//             <Link href={{
//                 pathname: "/contact",
//                 params: { id: 'bacon' }
//             }}>Press Me</Link>

//             <Link push href="/contact">Push contact using link</Link>
//             <Link replace href="/contact">replace contact </Link>
//             <Link disabled href="/contact">disabled contact </Link>
//             <Link withAnchor href="/contact">isOn contact </Link>
//             {/* <Redirect  href="/profile"></Redirect> */}



//         </View>
//     )
// }

// import { useRouter } from 'expo-router';
// import { Formik } from 'formik';
// import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
// import * as Yup from 'yup';

// const initialLoginValues = {
//     email: '',
//     password: '' 
// }

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().min(6, 'Too short').required('Password is required'),
// });

// export default function LoginScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Formik
//         initialValues={initialLoginValues}
//         validationSchema={LoginSchema}
//         onSubmit={(values, actions) => {
//           console.log('Form values:', values);
//           setTimeout(() => {
//             actions.setSubmitting(false);
//             router.replace('/(drawer)/(tabs)');
//           }, 1000);
//         }}
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//           isSubmitting,
//         }) => (
//           <>
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               onChangeText={handleChange('email')}
//               onBlur={handleBlur('email')}
//               value={values.email}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//             {touched.email && errors.email && (
//               <Text style={styles.error}>{errors.email}</Text>
//             )}

//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               onChangeText={handleChange('password')}
//               onBlur={handleBlur('password')}
//               value={values.password}
//               secureTextEntry
//             />
//             {touched.password && errors.password && (
//               <Text style={styles.error}>{errors.password}</Text>
//             )}

//             <Button
//               onPress={() => handleSubmit()}
//               title={isSubmitting ? 'Logging in...' : 'Login'}
//               disabled={isSubmitting}
//             />
//           </>
//         )}
//       </Formik>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   error: { color: 'red', marginBottom: 10 },
// });


// 



//import useThemeStore from '@/.expo/store/useThemeStore';
import CustomText from '@/component/CustomText';
import { Link, useRouter } from 'expo-router';
import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import * as Yup from "yup";


const initialLoginValues = {
  email: '',
  password: '',
  
}


const savedValues = {
  email: 'abc@gmail.com',
  password: '123456',
}


const validationSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});




const LoginScreen = () => {
  const [formValues, setFormValues] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
const colorScheme = useColorScheme(); // "light" ya "dark" return karega

  // const { theme, toggleTheme } = useThemeStore();

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={initialLoginValues || formValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("values------------", values);
          alert(`Email: ${values.email}\nPassword: ${values.password}`);

        }}
        enableReinitialize
      >
        {({ handleSubmit, isValid, handleBlur, isSubmitting, handleChange, setFieldValue, handleReset, touched, errors, values, resetForm }) =>
        (

          <View style={[styles.container]}>
            {/* <StatusBar barStyle="light-content" backgroundColor="#f07e3cff" />  */}
            <Text style={[styles.label, { paddingTop: 70, paddingBottom: 20 }]}>Login</Text>

            <TextInput
              style={[styles.input,isFocused && styles.focused]}
              placeholder='Email'
              onChangeText={handleChange("email")}
              value={values.email}
              // onBlur={handleBlur("email")}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
                       
            />
             {/* <MaterialCommunityIcons name="email-outline" size={28} color={#f07e3cff} /> */}


            <ErrorMessage name='email' >
              {
                errMsg => <Text style={styles.error}>{errMsg}</Text>
              }
            </ErrorMessage>

            <TextInput
              style={styles.input}
              placeholder='Password'
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
             
            />
            <ErrorMessage name='password'>
              {
                errMsg => <Text style={{ color: 'red', marginLeft: 17, marginBottom: 2 }}>{errMsg}</Text>
              }
            </ErrorMessage >
            <Link href={"/forgotpassword"} style={{ color: "#e06b0bff", textAlign: "center", alignItems: "flex-end" }}>Forgot Password? </Link>
            <Pressable
              //disabled={!isValid || !isSubmitting}
              onPress={() => {
                router.replace('/(drawer)/(tabs)');
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#e06b0bff" : "#f8811fff",
                  padding: 12,
                  borderRadius: 12,
                  margin: 17
                }
              ]}>
               
              <CustomText style={{ color: "#fff", textAlign: "center" }}>Login</CustomText>
            </Pressable>

            <Link href={"/register"} style={{ color: "#e06b0bff", textAlign: "center" }}>Don't have an Account? SignUp </Link>


            {/* <Button
                    title="Login"
                    color="#f8811fff"
                    onPress={() => Alert.alert('Simple Button pressed')}
                /> */}
            {/* 
                        <View style={{ marginRight: 10 }}>
                            <Button color="#f8811fff" title="Load Saved Data" onPress={() => setFormValues(savedValues)} />
                        </View> */}


          </View>
        )
        }
      </Formik>
    </ScrollView>
  )

}

export default LoginScreen

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    alignContent: 'flex-start',

  },
  input: {
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    fontSize: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  label: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 25,
    textAlign: "center",
    //marginBottom: 1,
  },
  label1: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 20
  },
  error: {
    // marginTop: 2,
    marginLeft: 20,
    color: 'red',
    marginBottom: 4
  },
  // form:{
  // //gap: 1,
  // //flexDirection: 'column',
  // //justifyContent: 'space-around',
  // }
  focused: {
    borderColor: "orange", 
  },
})