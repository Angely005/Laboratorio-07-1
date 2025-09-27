import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import TaskItem from '../components/TaskItem';
import { loadJSON, saveJSON, removeKey } from '../utils/storage';

const TASKS_KEY = '@taskflow_tasks';
const COMPLETED_KEY = '@taskflow_completedCount';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const saved = await loadJSON(TASKS_KEY, []);
        setTasks(saved || []);
        const cc = await loadJSON(COMPLETED_KEY, 0);
        setCompletedCount(cc || 0);
      })();
    }
  }, [isFocused]);

  useEffect(() => { saveJSON(TASKS_KEY, tasks); }, [tasks]);
  useEffect(() => { saveJSON(COMPLETED_KEY, completedCount); }, [completedCount]);

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const updated = { ...t, completed: !t.completed };
          setCompletedCount(c => updated.completed ? c + 1 : Math.max(0, c - 1));
          return updated;
        }
        return t;
      })
    );
  };

  const onDelete = (id) => {
    Alert.alert('Confirmar', '¿Eliminar esta tarea?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          setTasks(prev => {
            const toDelete = prev.find(t => t.id === id);
            if (toDelete?.completed) {
              setCompletedCount(c => Math.max(0, c - 1));
            }
            return prev.filter(t => t.id !== id);
          });
        }
      }
    ]);
  };

  const clearAll = () => {
    Alert.alert('Eliminar todas', '¿Seguro que quieres eliminar todas las tareas?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí, eliminar',
        style: 'destructive',
        onPress: async () => {
          setTasks([]);
          setCompletedCount(0);
          await removeKey(TASKS_KEY);
          await removeKey(COMPLETED_KEY);
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bienvenido a TaskFlow</Text>
      <View style={styles.summary}>
        <Text>Pendientes: {tasks.filter(t => !t.completed).length}</Text>
        <Text>Completadas: {completedCount}</Text>
      </View>

      <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
        <Text style={{ color: 'white' }}>Eliminar todas</Text>
      </TouchableOpacity>

      <FlatList
        data={[...tasks].sort((a, b) => b.createdAt - a.createdAt)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onToggleComplete={toggleComplete}
            onDelete={onDelete}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay tareas aún. Ve a "Add Task".</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  welcome: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  summary: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  clearBtn: { backgroundColor: '#B00020', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' }
});
