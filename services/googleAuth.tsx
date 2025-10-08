
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

interface LoginProps {
 email: string, 
 password: string
}

const WEB_CLIENT_ID ="860794879663-cku8jv3keh1e3fv1slk1calkvvoblahi.apps.googleusercontent.com";


 export  async function init() {
      const has = await GoogleSignin.hasPlayServices();
      if (has) {
        GoogleSignin.configure({
          offlineAccess: true,
          webClientId: WEB_CLIENT_ID,
        });
      }
    }


  export const onLogin = async (Login: LoginProps) => {

     
     const { email, password } = Login;

  try {
    // Try creating a new account
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log("✅ User account created:", userCredential.user.email);

  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("⚠️ Email already in use, signing in instead...");

      try {
        await auth().signInWithEmailAndPassword(email, password);
        console.log("✅ User signed in!");
      } catch (signInError: any) {
        if (signInError.code === 'auth/wrong-password') {
          console.log("❌ Incorrect password.");
        } else {
          console.error("❌ Sign-in error:", signInError);
        }
      }
    } else if (error.code === 'auth/invalid-email') {
      console.log("❌ Invalid email format.");
    } else {
      console.error("❌ Account creation error:", error);
    }
  }
  };


  export const onGoogleButtonPress = async () => {
    try {

      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // const currentUser = await GoogleSignin.getCurrentUser();
      // if (currentUser) {
      //   await GoogleSignin.signOut();
      // }
      // Obtain the user's ID token
      const data: any = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        data?.data.idToken,
      );

      console.log('credential: ', googleCredential);
       const result =await auth().signInWithCredential(googleCredential);

      console.log(result);
      
      return result;
    } catch (e) {
      console.log('e: ', e);
    }
  };



  