import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function EditCardScreen({ navigation, route, onEditCard }) {
  const { card } = route.params;
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);

  const handleSaveChanges = () => {
    onEditCard({ ...card, title, description });
    navigation.goBack();  // Navigate back to the ManageCards screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Card Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Edit Card Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
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
