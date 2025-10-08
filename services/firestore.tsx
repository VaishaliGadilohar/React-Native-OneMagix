import firestore from "@react-native-firebase/firestore";

export const getUsers = async () => {
  try {
    const usersCollection = await firestore().collection("Users").get();    
    const users = usersCollection.docs.map((doc) => doc.data());
    return users;


    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }       


};

export const addUser = async (user: { email: string; password: string }) => {
  try {
    const userRef = await firestore().collection("Users").add(user);                
    return userRef.id;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};  


export const updateUser = async (userId: string, user: { email?: string; password?: string }) => {
  try {
    await firestore().collection("Users").doc(userId).update(user);
    return true;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }

};  

export const deleteUser = async (userId: string) => {
  try {
    await firestore().collection("Users").doc(userId).delete(); 
    return true;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    } 


};

