import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation, cards }) {
  const [searchQuery, setSearchQuery] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('CardManagement')}>
          <Ionicons name="pencil" size={24} color="#0A0A0A" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const filteredCards = cards.filter(card => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (card.description && card.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search cards..."
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

      {filteredCards.length === 0 ? (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            Tap the '+' button to create your first card.
          </Text>
          <Text style={styles.placeholderText}>
            This is where your links will be organized.
          </Text>
        </View>
      ) : (
        <FlatList
          key={cards.length} // Forces re-render when cards array length changes
          data={filteredCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image && <Image source={{ uri: item.image }} style={styles.cardImage} />}
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.description ? <Text style={styles.cardDescription}>{item.description}</Text> : null}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('CardDetail', { cardId: item.id })}
                >
                  <Text style={styles.buttonText}>View Buttons</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Add Card Button */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddCard')}
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
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.91,
    borderRadius: 8,
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
  buttonContainer: {
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
    backgroundColor: '#0A0A0A',
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#f3f5f7',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
