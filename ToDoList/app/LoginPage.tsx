import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, Pressable } from 'react-native';
import { useToDo } from '../context/ToDoContext';
import { useRouter } from 'expo-router'; // Import the router

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useToDo();
  const router = useRouter(); // Initialize router

  const handleLogin = () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const success = loginUser(username, email, password);

    if (success) {
      Alert.alert('Login Successful', 'You are now logged in.');
      router.replace('/(tabs)/currentToDo');
      // Navigate to main app screen, e.g., router.replace('/home');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials.');
    }
  };

  const navigateToSignUp = () => {
    router.push('/SignupPage'); // Navigate to signup page
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/toDoIcon.png')}
        style={styles.profileImage}
        resizeMode="contain"
      />

      <Text style={styles.heading}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.footer}>
        Don't have an account?{' '}
        <Pressable onPress={navigateToSignUp}>
          <Text style={styles.link}>Sign Up</Text>
        </Pressable>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  footer: {
    marginTop: 16,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 60,
  },
});

export default LoginPage;
