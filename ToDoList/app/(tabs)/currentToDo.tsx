import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useToDo } from '@/context/ToDoContext';

export default function HomeScreen() {
  const router = useRouter();
  const { currentToDo, completeToDo, deleteToDo } = useToDo();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {currentToDo.map((task, index) => (
          <View key={index} style={styles.taskCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskText}>{task.title}</Text>
              <Text style={styles.taskDetails}>{task.details}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => deleteToDo(task)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => completeToDo(task)}>
                <Ionicons name="checkmark" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addToDo')}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  taskText: {
    fontSize: 16,
    fontWeight: '600',
  },
  taskDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 15,
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
