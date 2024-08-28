import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeScreen({ route }) {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{url}</Text>
      <QRCode value={url} size={200} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
