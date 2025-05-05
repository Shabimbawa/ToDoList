import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Tasks = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addToDo')}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6fb',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    color: '#ccc',
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  addButton: {
    marginTop: 10,
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
});

export default Tasks;