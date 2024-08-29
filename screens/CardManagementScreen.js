import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function CardManagementScreen({ navigation, cards, onDeleteCard, onEditCard, onReorderCard }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleEditPress = (card) => {
    setSelectedCard(card);
    setNewTitle(card.title);
    setNewDescription(card.description || '');
    setModalVisible(true);
  };

  const handleSaveTitle = () => {
    if (selectedCard) {
      onEditCard({ ...selectedCard, title: newTitle, description: newDescription });
      setModalVisible(false);
    }
  };

  const handleDeletePress = (cardId) => {
    Alert.alert(
      "Delete Card",
      "Are you sure you want to delete this card?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => onDeleteCard(cardId),
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  const moveCardUp = (index) => {
    if (index === 0) return;
    const updatedCards = [...cards];
    const temp = updatedCards[index - 1];
    updatedCards[index - 1] = updatedCards[index];
    updatedCards[index] = temp;
    onReorderCard(updatedCards);
  };

  const moveCardDown = (index) => {
    if (index === cards.length - 1) return;
    const updatedCards = [...cards];
    const temp = updatedCards[index + 1];
    updatedCards[index + 1] = updatedCards[index];
    updatedCards[index] = temp;
    onReorderCard(updatedCards);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {item.description ? <Text style={styles.cardDescription}>{item.description}</Text> : null}
            <TouchableOpacity
              style={[styles.qrButton, styles.disabledButton]}
              disabled={true} // Make the "View Buttons" button non-clickable
            >
              <Text style={styles.qrButtonText}>View Buttons</Text>
            </TouchableOpacity>
            <View style={styles.buttonActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditPress(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeletePress(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <View style={styles.reorderActions}>
                <TouchableOpacity onPress={() => moveCardUp(index)}>
                  <Text style={styles.reorderText}>↑</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => moveCardDown(index)}>
                  <Text style={styles.reorderText}>↓</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Modal for Editing Card Title and Description */}
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

            <Text style={styles.modalTitle}>Edit Card</Text>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Enter new title"
              placeholderTextColor="#777"
            />
            <TextInput
              style={styles.input}
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="Enter new description"
              placeholderTextColor="#777"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveTitle}>
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
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 10,
  },
  qrButton: {
    padding: 10,
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
    paddingVertical: 13,
    paddingHorizontal: 23,
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
    borderRadius: 10,
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
  },
  input: {
    height: 50, // Set the height for both title and description
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
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
