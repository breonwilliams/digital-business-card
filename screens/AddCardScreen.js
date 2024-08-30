import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export default function AddCardScreen({ navigation, onAddCard }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Request permission to access photos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need access to your camera roll to choose an image.');
      return;
    }

    // Let the user pick an image from their library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [191, 100], // 1.91:1 aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      // Resize the image to the desired aspect ratio
      const manipResult = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }], // Resize to maintain the aspect ratio
        { compress: 1, format: SaveFormat.JPEG }
      );
      setImage(manipResult.uri);
    }
  };

  const handleAddCard = () => {
    const newCard = { title, description, image, buttons: [] };
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

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <Text style={styles.imagePickerText}>Pick an Image</Text>
        )}
      </TouchableOpacity>

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
  imagePicker: {
    width: '100%',
    aspectRatio: 1.91 / 1, // Maintain the 1.91:1 aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#777',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  addButton: {
    paddingVertical: 13,
    paddingHorizontal: 23,
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
