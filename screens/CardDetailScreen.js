import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { BlurView } from 'expo-blur';

export default function CardDetailScreen({ route, navigation, cards }) {
  const { cardId } = route.params;
  const card = cards.find(c => c.id === cardId);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredButtons, setFilteredButtons] = useState(card.buttons);
  const [isQRModalVisible, setQRModalVisible] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [qrLabel, setQrLabel] = useState('');

  useEffect(() => {
    setFilteredButtons(
      card.buttons.filter(button => 
        button.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, card.buttons]);

  useLayoutEffect(() => {
    if (card) {
      navigation.setOptions({
        title: card.title,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('ButtonManagement', { cardId })}>
            <Ionicons name="pencil" size={24} color="#0A0A0A" />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, card]);

  const handleViewQRCode = (url, label) => {
    setQrUrl(url);
    setQrLabel(label);
    setQRModalVisible(true);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this link: ${qrUrl}`,
        url: qrUrl,
        title: qrLabel,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
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
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search buttons..."
          placeholderTextColor="#777777"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Ionicons name="close-circle" size={20} color="#777777" />
          </TouchableOpacity>
        )}
      </View>

      {filteredButtons.length === 0 ? (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            Tap the '+' button to add your first button.
          </Text>
          <Text style={styles.placeholderText}>
            This is where your buttons will be organized.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredButtons}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => handleViewQRCode(item.url, item.label)}
            >
              <Text style={styles.qrButtonText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Add New Button Floating Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddButton', { cardId })}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* QR Code Modal */}
      <Modal
        visible={isQRModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setQRModalVisible(false)}
      >
        <BlurView intensity={100} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Share Icon */}
            <TouchableOpacity
              style={styles.shareIcon}
              onPress={handleShare}
            >
              <Ionicons name="share-outline" size={24} color="#000" />
            </TouchableOpacity>

            {/* Close Icon */}
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setQRModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            
            <QRCode value={qrUrl} size={200} />
            <Text style={styles.modalTitle}>{qrLabel}</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    paddingRight: 35, // Adjust padding to make room for the clear icon
    color: '#181818',
    fontSize: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
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
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    paddingTop: 45, // Added padding to the top to center the QR code better
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  shareIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginTop: 20,
    color: '#181818',
  },
});
