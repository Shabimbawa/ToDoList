import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todoService } from '../services/todoService';

const Add = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAdd = async () => {
    if (title.trim() === '') {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userId = await AsyncStorage.getItem('userId');
      
      if (!userId) {
        console.log('No user ID found, redirecting to login');
        router.replace('/LoginPage');
        return;
      }

      console.log('Adding todo item:', { title, details, userId });
      
      const response = await todoService.addTodo({
        item_name: title,
        item_description: details,
        user_id: userId
      });
      
      if (response.status === 200) {
        console.log('Todo added successfully:', response);
        router.back();
      } else {
        setError(response.message || 'Failed to add todo');
      }
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('An error occurred while adding the todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.header}>Add New Task</Text>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Details"
        value={details}
        onChangeText={setDetails}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.detailsInput]}
      />
      
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={handleAdd}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.addButtonText}>Add</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#f3f6fb',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    elevation: 2,
  },
  detailsInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#007aff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff3b30',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Add;