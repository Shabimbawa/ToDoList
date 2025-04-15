import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useToDo } from '@/context/ToDoContext';
import { Ionicons } from '@expo/vector-icons';

export default function CompletedToDoPage() {
  const { completedToDo, deleteCompletedToDo } = useToDo();

  const completedToDos = completedToDo;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Tasks</Text>
      {completedToDos.length === 0 ? (
        <Text style={styles.emptyText}>No completed tasks yet.</Text>
      ) : (
        <FlatList
          data={completedToDos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.toDoItem}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteCompletedToDo(item)}>
                <Ionicons name="trash-outline" size={24} color="#ff3b30" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: '#f3f6fb',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 50,
    fontSize: 16,
  },
  toDoItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
