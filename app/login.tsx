

import { init, onGoogleButtonPress, onLogin } from '@/services/googleAuth';
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from 'expo-router';
import { ErrorMessage, Formik } from 'formik';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import * as Yup from "yup";
import CustomText from '../component/CustomText';
import { useAuthStore } from "../store/authStrore";

const initialLoginValues = {
  email: '',
  password: '',
};


const validationSchema = Yup.object({
  email: Yup.string()
    .trim().email()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ),
  password: Yup.string()
    .min(6, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    .required("Please enter your password"),
});

const LoginScreen = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const [formValues, setFormValues] = useState(null);
 // const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);

  type GoogleProfile = {
    name: string;
    email: string;
    picture: string;
  };

  type GoogleSignInResult = {
    additionalUserInfo: {
      isNewUser: boolean;
      profile: GoogleProfile;
    };
  };

  useEffect(() => {
    init();
  }, []);


  const handleGoogleSignIn = async () => {
    try {

      setGoogleLoading(true);
      const result = await onGoogleButtonPress();

      if (result && result.additionalUserInfo && result.additionalUserInfo.profile) {
        const profile = result.additionalUserInfo.profile;

        setUser({
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
        });

        router.replace("/(drawer)/(tabs)");
      } else {
        console.log("Google response invalid:", result);
      }
    } catch (error) {
      console.error("Google Sign-in failed:", error);
    } finally {
      setGoogleLoading(false);
    }
  };



  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Formik
        initialValues={initialLoginValues || formValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {

          onLogin({ email: values.email, password: values.password });
          router.replace('/(drawer)/(tabs)');


          console.log("values------------", values);
          //alert(`Email: ${values.email}\nPassword: ${values.password}`);

        }}
        validateOnChange={true}  
        validateOnBlur={true}
        enableReinitialize
      >
        {({ handleSubmit, isValid, handleBlur, isSubmitting, handleChange, errors, values }) => (
          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              //style={[styles.input, isFocused && styles.focused]}

              placeholder='Email'
              onChangeText={handleChange("email")}
              value={values.email}
              onBlur={handleBlur("email")}
              autoCapitalize="none"
              keyboardType="email-address"

            // onBlur={() => setIsFocused(false)
            // onFocus={() => setIsFocused(true) 
            // onBlur={() => {
            //  handleBlur("email"); 
            //  setIsFocused(false); 
            // }} 
            />

            <ErrorMessage name='email'>
              {errMsg => <Text style={styles.error}>{errMsg}</Text>}
            </ErrorMessage>

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                placeholder='Password'
                secureTextEntry={secureText}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <TouchableOpacity
                onPress={() => setSecureText(!secureText)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={secureText ? "eye-off" : "eye"}
                  size={22}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            <ErrorMessage name='password'>
              {errMsg => <Text style={styles.error}>{errMsg}</Text>}
            </ErrorMessage>

            {/* Forgot Password */}
            <Link href={"/forgotpassword"} style={styles.forgotLink}>
              Forgot Password?
            </Link>

            {/* Login Button */}
            <Pressable
              // disabled={!isValid || !isSubmitting}

              onPress={() => {

                if (values.email && values.password && isValid) {
                  handleSubmit(); 
                } else {
                  alert("Please fill in both email and password correctly.");
                }


              }}
              style={({ pressed }) => [
                styles.primaryBtn,
                { backgroundColor: pressed ? "#e06b0b" : "#f8811f" },
              ]}
            >
              <CustomText style={styles.btnText}>Login</CustomText>
            </Pressable>

            {/* Google Button */}
            <Pressable
              onPress={handleGoogleSignIn}
              style={({ pressed }) => [
                styles.googleBtn,
                { backgroundColor: pressed ? "#aec914cc" : "#ec9f0eff" },
              ]}
            >
              {googleLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <CustomText style={styles.btnText}>Sign In with Google</CustomText>
              )}
            </Pressable>

            {/* Signup Link */}
            <Link href={"/register"} style={styles.signupLink}>
              Don't have an Account? <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
            </Link>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#f8811f",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    fontSize: 15,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginHorizontal: 0,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  focused: {
    borderColor: "orange",
  },
  error: {
    marginLeft: 5,
    color: "red",
    marginBottom: 6,
    fontSize: 13,
  },
  forgotLink: {
    color: "#e06b0b",
    textAlign: "right",
    marginBottom: 20,
  },
  primaryBtn: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  googleBtn: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signupLink: {
    color: "#e06b0b",
    textAlign: "center",
    fontSize: 15,
  },
});
