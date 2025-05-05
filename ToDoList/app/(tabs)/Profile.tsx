import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/toDoIcon.png')}
        style={styles.profileImage}
        resizeMode="contain"
      />

      <Text style={styles.info}>Email: user@example.com</Text>

      <View style={styles.buttonContainer}>
        <Button title="Logout" color="#ff5c5c" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 60,
  },
  info: {
    fontSize: 18,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '60%',
  },
});

export default Profile;