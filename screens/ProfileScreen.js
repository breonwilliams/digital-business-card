import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, Modal, TextInput } from 'react-native';

export default function ProfileScreen({ navigation, cards, onDeleteCard, onEditCard }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleEditPress = (card) => {
    setSelectedCard(card);
    setNewTitle(card.title);
    setNewDescription(card.description);
    setModalVisible(true);
  };

  const handleSaveTitle = () => {
    if (selectedCard) {
      onEditCard({ ...selectedCard, title: newTitle, description: newDescription });
      setModalVisible(false);
    }
  };

  const filteredCards = cards.filter(card => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (card.description && card.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search cards..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {item.description ? <Text style={styles.cardDescription}>{item.description}</Text> : null}
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => navigation.navigate('CardDetail', { cardId: item.id })}
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
                onPress={() => onDeleteCard(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button
        title="Add New Card"
        onPress={() => navigation.navigate('AddCard')}
        color="#181818"
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Card Title</Text>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Enter new title"
            />
            <TextInput
              style={styles.input}
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="Enter new description"
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#181818" />
              <Button title="Save" onPress={handleSaveTitle} color="#181818" />
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
    backgroundColor: '#f3f5f7',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#181818',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 10,
  },
  qrButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#0A0A0A',
    borderColor: '#0A0A0A',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  qrButtonText: {
    color: '#f3f5f7',
  },
  buttonActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#777777',
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#181818',
    fontSize: 14,
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
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#181818',
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
