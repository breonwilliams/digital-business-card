import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AddCardScreen({ navigation, onAddCard }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCard = () => {
    const newCard = { title, description, buttons: [] };
    onAddCard(newCard);
    navigation.navigate('Profile'); // Navigate back to the Profile screen after adding the card
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Card Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Add Card" onPress={handleAddCard} />
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
