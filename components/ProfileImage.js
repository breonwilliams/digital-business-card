import React from 'react';
import { StyleSheet, Image } from 'react-native';

const PlaceholderImage = require('../assets/images/profile-placeholder.png'); // Make sure to add a placeholder image to your assets

export default function ProfileImage() {
  return (
    <Image source={PlaceholderImage} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
