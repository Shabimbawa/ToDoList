import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useToDo } from '@/context/ToDoContext';

const Profile = () => {
  const { loggedInUser, logoutUser } = useToDo();

  if (!loggedInUser) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/toDoIcon.png')}
        style={styles.profileImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome, {loggedInUser.username}!</Text>
      <Text style={styles.info}>Email: {loggedInUser.email}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Logout" color="#ff5c5c" onPress={logoutUser} />
      </View>
    </View>
  );
};

export default Profile;

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
    borderRadius: 60, // if you want a circle
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 18,
    marginBottom: 32,
  },
  buttonContainer: {
    width: '60%',
  },
});
