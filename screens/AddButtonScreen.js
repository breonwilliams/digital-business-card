import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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
        placeholderTextColor="#777"
        value={label}
        onChangeText={setLabel}
      />
      <Text style={styles.label}>Button URL:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter button URL"
        placeholderTextColor="#777"
        value={url}
        onChangeText={setUrl}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddButton}>
        <Text style={styles.addButtonText}>Add Button</Text>
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
    height: 50, 
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#181818',
    fontSize: 16,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#0A0A0A',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#f3f5f7',
    fontSize: 16,
  },
});
