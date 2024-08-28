import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Modal, TextInput } from 'react-native';

export default function CardDetailScreen({ route, navigation, cards, onEditButton, onDeleteButton, onIncrementScanCount }) {
  const { cardId } = route.params;
  const card = cards.find(c => c.id === cardId);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredButtons, setFilteredButtons] = useState(card.buttons);

  useEffect(() => {
    setFilteredButtons(
      card.buttons.filter(button => 
        button.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, card.buttons]);

  useEffect(() => {
    if (card) {
      navigation.setOptions({ title: card.title });
    }
  }, [navigation, card]);

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

  const handleDeleteButton = (index) => {
    const buttonIndex = card.buttons.findIndex((_, i) => i === index);
    onDeleteButton(cardId, buttonIndex);
  };

  const handleViewQRCode = (url, index) => {
    onIncrementScanCount(cardId, index);
    navigation.navigate('QRCode', { url });
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
      <TextInput
        style={styles.searchBar}
        placeholder="Search buttons..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredButtons}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.buttonItem}>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => handleViewQRCode(item.url, index)}
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
                onPress={() => handleDeleteButton(index)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button
        title="Add New Button"
        onPress={() => navigation.navigate('AddButton', { cardId })}
        color="#181818"
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
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#181818" />
              <Button title="Save" onPress={handleSaveButton} color="#181818" />
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
    borderRadius: 6,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  buttonItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 6,
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
