// // import { useMutation } from "@tanstack/react-query";
// // import axios from "axios";
// // import { Formik } from "formik";
// // import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
// // import * as Yup from "yup";

// // // ✅ Validation schema
// // const ProductSchema = Yup.object().shape({
// //   title: Yup.string().required("Title is required"),
// //   price: Yup.number().typeError("Price must be a number").required("Price is required"),
// //   description: Yup.string().required("Description is required"),
// //   image: Yup.string().url("Must be a valid URL").required("Image URL required"),
// //   category: Yup.string().required("Category is required"),
// // });

// // // ✅ API call function
// // const addProduct = async (product: any) => {
// //   const res = await axios.post("https://fakestoreapi.com/products", product);
// //   return res.data;
// // };

// // export default function AddProduct() {
// //   const mutation = useMutation({
// //     mutationFn: addProduct,
// //     onSuccess: (data) => {
// //       Alert.alert("✅ Success", "Product added successfully!");
// //       console.log("Product added:", data);
// //     },
// //     onError: (error: any) => {
// //       Alert.alert("❌ Error", error.message || "Something went wrong!");
// //     },
// //   });

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <Text style={styles.heading}>🛍️ Add New Product</Text>

// //       <Formik
// //         initialValues={{
// //           title: "",
// //           price: "",
// //           description: "",
// //           image: "",
// //           category: "",
// //         }}
// //         validationSchema={ProductSchema}
// //         onSubmit={(values, { resetForm }) => {
// //           mutation.mutate({
// //             title: values.title,
// //             price: parseFloat(values.price),
// //             description: values.description,
// //             image: values.image,
// //             category: values.category,
// //           });
// //           resetForm();
// //         }}
// //       >
// //         {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
// //           <View>
// //             <TextInput
// //               placeholder="Title"
// //               style={styles.input}
// //               onChangeText={handleChange("title")}
// //               onBlur={handleBlur("title")}
// //               value={values.title}
// //             />
// //             {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

// //             <TextInput
// //               placeholder="Price"
// //               style={styles.input}
// //               keyboardType="numeric"
// //               onChangeText={handleChange("price")}
// //               onBlur={handleBlur("price")}
// //               value={values.price}
// //             />
// //             {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}

// //             <TextInput
// //               placeholder="Description"
// //               style={[styles.input, { height: 100 }]}
// //               multiline
// //               onChangeText={handleChange("description")}
// //               onBlur={handleBlur("description")}
// //               value={values.description}
// //             />
// //             {touched.description && errors.description && (
// //               <Text style={styles.error}>{errors.description}</Text>
// //             )}

// //             <TextInput
// //               placeholder="Image URL"
// //               style={styles.input}
// //               onChangeText={handleChange("image")}
// //               onBlur={handleBlur("image")}
// //               value={values.image}
// //             />
// //             {touched.image && errors.image && <Text style={styles.error}>{errors.image}</Text>}

// //             <TextInput
// //               placeholder="Category"
// //               style={styles.input}
// //               onChangeText={handleChange("category")}
// //               onBlur={handleBlur("category")}
// //               value={values.category}
// //             />
// //             {touched.category && errors.category && (
// //               <Text style={styles.error}>{errors.category}</Text>
// //             )}

// //             <Button
// //               title={mutation.status === "pending" ? "Submitting..." : "Submit"}
// //               onPress={() => handleSubmit()}
// //               disabled={mutation.status === "pending"}
// //             />
// //           </View>
// //         )}
// //       </Formik>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 20,
// //     backgroundColor: "#fff",
// //   },
// //   heading: {
// //     fontSize: 22,
// //     fontWeight: "bold",
// //     marginBottom: 20,
// //     textAlign: "center",
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: "#ccc",
// //     borderRadius: 10,
// //     padding: 10,
// //     marginBottom: 10,
// //   },
// //   error: {
// //     color: "red",
// //     fontSize: 13,
// //     marginBottom: 8,
// //   },
// // });


import { addPost } from "@/services/service";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

const ProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number().typeError("Price must be a number").required("Price is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().url("Must be a valid URL").required("Image URL requ ir ed"), 
  category: Yup.string().required("Category is required"),
});

const initialValue =
        {
            title: "",
            price: "",
            description: "",
            image: "",
            category: "",
        }

export default function AddProduct() {
  const mutation = useMutation({
    mutationFn: (product: any) => addPost("/products", product),
    onSuccess: (data) => {
      Alert.alert("✅ Success", "Product added successfully!");
      console.log("Product added:", data);
    },
    onError: (error: any) => {
      Alert.alert("❌ Error", error.message || "Something went wrong!");
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛒 Add New Product</Text>

      <Formik
        initialValues={
         initialValue
        }
        validationSchema={ProductSchema}
        onSubmit={(values, { resetForm }) => {
          mutation.mutate({
            title: values.title,
            price: parseFloat(values.price),
            description: values.description,
            image: values.image,
            category: values.category,
          });
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formCard}>
            {/* Title */}
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter product title"
              placeholderTextColor="#999"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
            />
            {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

            {/* Price */}
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter price"
              placeholderTextColor="#999"
              keyboardType="numeric"
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              value={values.price}
            />
            {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              placeholder="Enter description"
              placeholderTextColor="#999"
              multiline
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
            {touched.description && errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            {/* Image URL */}
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter image URL"
              placeholderTextColor="#999"
              onChangeText={handleChange("image")}
              onBlur={handleBlur("image")}
              value={values.image}
            />
            {touched.image && errors.image && <Text style={styles.error}>{errors.image}</Text>}

            {/* Category */}
            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter category"
              placeholderTextColor="#999"
              onChangeText={handleChange("category")}
              onBlur={handleBlur("category")}
              value={values.category}
            />
            {touched.category && errors.category && (
              <Text style={styles.error}>{errors.category}</Text>
            )}

            {/* Submit Button */}
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { opacity: pressed || mutation.status === "pending" ? 0.7 : 1 },
              ]}
              onPress={() => handleSubmit()}
              disabled={mutation.status === "pending"}
            >
              {mutation.status === "pending" ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Add Product</Text>
              )}
            </Pressable>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff5ee", // light orange background
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ff6a00",
    textAlign: "center",
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: "#ff6a00",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.2,
    borderColor: "#ffd6b3",
    backgroundColor: "#fffaf6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 15,
    color: "#333",
  },
  error: {
    color: "#d9534f",
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#ff6a00",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#ff6a00",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

//https://fakestoreapi.com/products



// import { Formik } from 'formik'
// import { Text, View } from 'react-native'

// import * as Yup from 'yup'

// const useMutation = () => {


//     const initialValue = {
//         id: "",
//         title: "",
//         price: "",
//         description: "",
//         category: "",
//         image: ""

//     } 

//  const validationSchema = Yup.object().shape({

//   title: Yup.string().required("Title is required"),
//   price: Yup.number().typeError("Price must be a number").required("Price is required"),
//   description: Yup.string().required("Description is required"),
//   image: Yup.string().url("Must be a valid URL").required("Image URL requ ir ed"), 
//   category: Yup.string().required("Category is required"),

//     })

//     const onhandelSubmit = {

//     }            
//     return (
//         // <Formik
//         //     initialValues={initialValue}
//         //     validationSchema={validationSchema}
//         //     // onSubmit={{onhandelSubmit}}
//         // >
//         //     <View>
//         //         <Text>useMutation</Text>
//         //     </View>
//         // </Formik>

//     )
// }

// export default useMutation