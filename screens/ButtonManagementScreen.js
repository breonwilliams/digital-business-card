import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function ButtonManagementScreen({ route, navigation, cards, onDeleteButton, onEditButton, onReorderButton }) {
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

  const handleDeletePress = (index) => {
    Alert.alert(
      "Delete Button",
      "Are you sure you want to delete this button?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => onDeleteButton(cardId, index),
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  const moveButtonUp = (index) => {
    if (index === 0) return;
    const updatedButtons = [...card.buttons];
    const temp = updatedButtons[index - 1];
    updatedButtons[index - 1] = updatedButtons[index];
    updatedButtons[index] = temp;
    onReorderButton(cardId, updatedButtons);
  };

  const moveButtonDown = (index) => {
    if (index === card.buttons.length - 1) return;
    const updatedButtons = [...card.buttons];
    const temp = updatedButtons[index + 1];
    updatedButtons[index + 1] = updatedButtons[index];
    updatedButtons[index] = temp;
    onReorderButton(cardId, updatedButtons);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={card.buttons}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={[styles.qrButton, styles.disabledButton]}
              disabled={true} // Make the button non-clickable
            >
              <Text style={styles.qrButtonText}>{item.label}</Text>
            </TouchableOpacity>
            <View style={styles.buttonActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditPress(item, index)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeletePress(index)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <View style={styles.reorderActions}>
                <TouchableOpacity onPress={() => moveButtonUp(index)}>
                  <Text style={styles.reorderText}>↑</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => moveButtonDown(index)}>
                  <Text style={styles.reorderText}>↓</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Modal for Editing Button */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={100} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Icon */}
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Edit Button</Text>
            <TextInput
              style={styles.input}
              value={newLabel}
              onChangeText={setNewLabel}
              placeholder="Enter new label"
              placeholderTextColor="#777"
            />
            <TextInput
              style={styles.input}
              value={newUrl}
              onChangeText={setNewUrl}
              placeholder="Enter new URL"
              placeholderTextColor="#777"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveButton}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f5f7',
  },
  buttonItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  qrButton: {
    paddingVertical: 13,
    paddingHorizontal: 23,
    borderRadius: 8,
    backgroundColor: '#0A0A0A',
    borderColor: '#0A0A0A',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  qrButtonText: {
    color: '#f3f5f7',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    paddingVertical: 13,
    paddingHorizontal: 23,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0A0A0A',
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0A0A0A',
    fontSize: 16,
  },
  reorderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reorderText: {
    fontSize: 20,
    color: '#0A0A0A',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#181818',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#181818',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonText: {
    color: '#0A0A0A',
    fontSize: 16,
    padding: 10,
  },
});
