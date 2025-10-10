/*
Formik componenet 
formik 
form
feilds
error msg


*/
import CustomText from '@/component/CustomText';
import { Link } from 'expo-router';
import { ErrorMessage, FieldArray, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from "yup";

const initialLoginValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    social: {
        facebook: '',
        instragram: ''
    },
    phonenumber: ['', ''],
    phNum: ['']

}


const savedValues = {
    name: 'aa',
    email: 'abc@gmail.com',
    password: '122',
    confirmPassword: '2564412',
    social: {
        facebook: '',
        instragram: ''
    },
    phonenumber: ['', ''],
    phNum: ['']

}


const validationSchema = Yup.object({

    name: Yup.string().min(3).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password must match").required(),
    // phNum:Yup.array().required().
});




const register = () => {
    const [formValues, setFormValues] = useState(null);

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

                    <View style={styles.container}>
                        <StatusBar barStyle="dark-content" backgroundColor="#f07e3cff" />
                        <CustomText style={[styles.label, { paddingTop: 70, paddingBottom: 20 }]}>Register</CustomText>
                        {/* <Text style={styles.label1}>Email</Text> */}
                        <TextInput

                            style={styles.input}
                            placeholder='Name'
                            value={values.name}
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}

                        />
                        {
                            errors.name && touched.name && <Text style={{ color: 'red', marginLeft: 17 }}>{errors.name}</Text>
                        }

                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            onChangeText={handleChange("email")}
                            value={values.email}
                            onBlur={handleBlur("email")}

                        />
                        <ErrorMessage name='email' >
                            {
                                errMsg => <Text style={{ color: 'red', marginLeft: 17 }}>{errMsg}</Text>
                            }
                        </ErrorMessage>
                        {/* {
                errors.email && touched.email &&<Text>{errors.email}</Text>
            } */}

                        {/* <Text style={styles.label1}>Password</Text> */}
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                        />
                        <ErrorMessage name='password'>
                            {
                                errMsg => <Text style={{ color: 'red', marginLeft: 17 }}>{errMsg}</Text>
                            }
                        </ErrorMessage >

                        <TextInput
                            style={styles.input}
                            placeholder='Confirm Password'
                            onChangeText={handleChange("confirmPassword")}
                            value={values.confirmPassword}
                            onBlur={handleBlur("confirmPassword")}
                        />
                        <ErrorMessage name='confirmPassword'>
                            {
                                errMsg => <Text style={{ color: 'red', marginLeft: 17 }}>{errMsg}</Text>
                            }</ErrorMessage>

                        <TextInput
                            style={styles.input}
                            placeholder='Facebook'
                            onChangeText={handleChange("social.facebook")}
                            value={values.social.facebook}
                            onBlur={handleBlur("social.facebook")}
                        />
                        <ErrorMessage name='social.facebook'>
                            {
                                errMsg => <Text style={{ color: 'red', marginLeft: 17 }}>{errMsg}</Text>
                            }</ErrorMessage>

                        <TextInput
                            style={styles.input}
                            placeholder='Instragram'
                            onChangeText={handleChange("social.instragram")}
                            value={values.social.instragram}
                            onBlur={handleBlur("social.instragram")}
                        />
                        <ErrorMessage name='social.instragram'>
                            {
                                errMsg => <Text style={{ color: 'red', marginLeft: 17 }}>{errMsg}</Text>
                            }</ErrorMessage>
                        {/* <TextInput
                        style={styles.input}
                        placeholder='Primary PhoneNumber'
                        onChangeText={handleChange("phonenumber[0]")}
                        value={values.phonenumber[0]}
                        onBlur={handleBlur("phonenumber[0]")}
                    />
                    <ErrorMessage name='phonenumber[0]'>
                        {
                            errMsg => <Text style={{ color: 'red', marginLeft: 17 }}>{errMsg}</Text>
                        }</ErrorMessage>
                    <TextInput
                        style={styles.input}
                        placeholder='secondary PhoneNumber'
                        onChangeText={handleChange("phonenumber[1]")}
                        value={values.phonenumber[1]}
                        onBlur={handleBlur("phonenumber[1]")}
                    />
                    <ErrorMessage name='phonenumber[1]'>
                        {
                            errMsg => <Text style={{ color: 'red', marginLeft: 17 }}>{errMsg}</Text>
                        }</ErrorMessage> */}


                        <CustomText style={{ marginLeft: 15, marginBottom: 5 }}>List of Phone number</CustomText>
                        <FieldArray name="phNum">
                            {fieldArrayProps => {
                                const { push, remove, form } = fieldArrayProps;
                                const { values, handleChange, handleBlur } = form;
                                const { phNum } = values;
                                return (
                                    <View>
                                        {phNum.map((_phNum: any, index: number) => (
                                            <View
                                                key={index}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginBottom: 10, // ✅ instead of gap
                                                }}
                                            >
                                                {/* ✅ Remove this: <Text>{values.phNum[index]}</Text> */}

                                                <TextInput
                                                    style={[styles.input, { flex: 1 }]}
                                                    placeholder="Enter phone number"
                                                    value={values.phNum[index]}
                                                    onChangeText={handleChange(`phNum[${index}]`)}
                                                    onBlur={handleBlur(`phNum[${index}]`)}
                                                    keyboardType="phone-pad"
                                                />

                                                {index > 0 && (
                                                    <View style={{ marginRight: 15 }}>
                                                        <Button color="#f8811fff" title="Remove" onPress={() => remove(index)} />
                                                    </View>
                                                )}

                                                {index === phNum.length - 1 && (
                                                    <View style={{ marginRight: 10 }}>
                                                        <Button color="#f8811fff" title="Add" onPress={() => push('')} />
                                                    </View>
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                );
                            }}
                        </FieldArray>

                        {/* <FieldArray name="phNum">
                        {({ push, remove }) => (
                            <View style={{  marginBottom: 10 }}>
                                {values.phNum.map((num, index) => (
                                    <View key={index}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={`Phone number ${index + 1}`}
                                            value={values.phNum[index]}
                                            onChangeText={text => setFieldValue(`phNum[${index}]`, text)}
                                            onBlur={handleBlur(`phNum[${index}]`)}
                                            keyboardType="phone-pad"
                                        />
                                        {index > 0 && <Button title="-" onPress={() => remove(index)} />}
                                    </View>
                                ))}
                                <Button title="+" onPress={() => push('')} />
                            </View>
                        )}
                    </FieldArray> */}

                        <Pressable
                            disabled={!isValid || !isSubmitting}
                            onPress={() => {
                                console.log("values------------", values);
                                alert("Pressed!")
                            }}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed ? "#e06b0bff" : "#f8811fff",
                                    padding: 12,
                                    borderRadius: 12,
                                    margin: 17
                                }
                            ]}>
                            <CustomText style={{ color: "#fff", textAlign: "center" }}>Register</CustomText>
                        </Pressable>

                        <Link href={"/login"} style={{ color: "#e06b0bff", textAlign: "center" }}>Already have an Account? Login </Link>

                        {/* <Button
                    title="Login"
                    color="#f8811fff"
                    onPress={() => Alert.alert('Simple Button pressed')}
                /> */}
                        {/* 
                        <View style={{ marginRight: 10 }}>
                            <Button color="#f8811fff" title="Load Saved Data" onPress={() => setFormValues(savedValues)} />
                        </View> */}

                        {/* <Field as componenet= 'textarea' id='comments' name ='comments'/> */}
                    </View>
                )
                }
            </Formik>
        </ScrollView>
    )

}

export default register

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
        borderRadius: 12
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
        margin: 20,
        textShadowColor: 'red'
    }
    // form:{
    // //gap: 1,
    // //flexDirection: 'column',
    // //justifyContent: 'space-around',
    // }

})