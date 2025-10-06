import axios from 'axios';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const PostData = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = () => {
    const data = { title, body };

    axios.post('https://jsonplaceholder.typicode.com/posts', data)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((error) => {
        console.error("There was an error posting the data", error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={styles.input}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
      {response && (
        <View style={styles.response}>
          <Text>Response:</Text>
          <Text>{JSON.stringify(response)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  response: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0f7fa',
  },
});

export default PostData;