import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { loadJSON, saveJSON } from '../utils/storage';

const TASKS_KEY = '@taskflow_tasks';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const onSave = async () => {
    if (!title.trim()) {
      Alert.alert('Validación', 'El título no puede estar vacío.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      completed: false,
      createdAt: Date.now()
    };

    const existing = await loadJSON(TASKS_KEY, []);
    const next = [...existing, newTask];
    await saveJSON(TASKS_KEY, next);

    setTitle('');
    setDesc('');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Ej: Hacer la tarea de matemáticas"
      />

      <Text style={styles.label}>Descripción (opcional)</Text>
      <TextInput
        value={desc}
        onChangeText={setDesc}
        style={[styles.input, { height: 100 }]}
        placeholder="Detalles..."
        multiline
      />

      <Button title="Guardar tarea" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 12 },
  label: { marginBottom: 6, fontWeight: '600' }
});
