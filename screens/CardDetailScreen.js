import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardDetailScreen({ route, navigation, cards }) {
  const { cardId } = route.params;
  const card = cards.find(c => c.id === cardId);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredButtons, setFilteredButtons] = useState(card.buttons);

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

  const handleViewQRCode = (url) => {
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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => handleViewQRCode(item.url)}
          >
            <Text style={styles.qrButtonText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Add New Button Floating Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddButton', { cardId })}
      >
        <Ionicons name="add" size={24} color="#fff" />
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
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
    borderRadius: 28,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
