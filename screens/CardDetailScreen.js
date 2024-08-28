import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Modal, TextInput } from 'react-native';

export default function CardDetailScreen({ route, navigation, cards, onEditButton }) {
  const { cardId } = route.params;
  const card = cards.find(c => c.id === cardId);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleEditPress = (button, index) => {
    setSelectedButton({ ...button, index });
    setNewLabel(button.label);
    setNewUrl(button.url);
    setModalVisible(true);
  };

  const handleSaveButton = () => {
    if (selectedButton) {
      const updatedButton = { ...selectedButton, label: newLabel, url: newUrl };
      onEditButton(cardId, updatedButton);
      setModalVisible(false);
    }
  };

  if (!card) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No card data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{card.title}</Text>
      <FlatList
        data={card.buttons}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => navigation.navigate('QRCode', { url: item.url })}
            >
              <Text style={styles.buttonText}>{item.label}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditPress(item, index)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        title="Add New Button"
        onPress={() => navigation.navigate('AddButton', { cardId })}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Button</Text>
            <TextInput
              style={styles.input}
              value={newLabel}
              onChangeText={setNewLabel}
              placeholder="Enter new label"
            />
            <TextInput
              style={styles.input}
              value={newUrl}
              onChangeText={setNewUrl}
              placeholder="Enter new URL"
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={handleSaveButton} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  qrButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
