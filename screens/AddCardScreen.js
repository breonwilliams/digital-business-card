import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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
        placeholderTextColor="#777"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Card Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card description"
        placeholderTextColor="#777"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f5f7',
  },
  label: {
    fontSize: 18,
    color: '#181818',
    marginBottom: 10,
  },
  input: {
    height: 40, 
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#181818',
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#0A0A0A',
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#f3f5f7',
    fontSize: 16,
  },
});
