import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const completedTasks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Tasks</Text>
      <Text style={styles.emptyText}>No completed tasks yet.</Text>
    </View>
  );
};

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
});

export default completedTasks;