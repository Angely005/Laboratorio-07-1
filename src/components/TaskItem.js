import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ item, onToggleComplete, onDelete }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggleComplete(item.id)}>
        <View style={[styles.check, item.completed && styles.checked]} />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={[styles.title, item.completed && styles.completedText]}>
          {item.title}
        </Text>
        {item.desc ? <Text style={styles.desc}>{item.desc}</Text> : null}
      </View>

      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.del}>
        <Text style={{ color: 'white' }}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#666', marginRight: 12 },
  checked: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 12, color: '#666' },
  completedText: { textDecorationLine: 'line-through', color: '#999' },
  del: { backgroundColor: '#E53935', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6 }
});
