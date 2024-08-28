import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AddButtonScreen({ route, navigation, onAddButton }) {
  const { cardId } = route.params;
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');

  const handleAddButton = () => {
    const newButton = { label, url };
    onAddButton(cardId, newButton);
    navigation.navigate('CardDetail', { cardId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Button Label:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter button label"
        value={label}
        onChangeText={setLabel}
      />
      <Text style={styles.label}>Button URL:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter button URL"
        value={url}
        onChangeText={setUrl}
      />
      <Button title="Add Button" onPress={handleAddButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
