import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const [time, setTime] = useState(new Date());
  const [intervalSeconds, setIntervalSeconds] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime(new Date());
    }, intervalSeconds * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [intervalSeconds]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.clockBox}>
        <Text style={styles.clockText}>{time.toLocaleTimeString()}</Text>
        <Text style={styles.small}>Intervalo: {intervalSeconds} seg</Text>
      </View>

      <View style={styles.row}>
        {[1, 2, 5].map(sec => (
          <TouchableOpacity key={sec} style={styles.btn} onPress={() => setIntervalSeconds(sec)}>
            <Text style={styles.btnText}>{sec}s</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  clockBox: { alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, width: '80%' },
  clockText: { fontSize: 28, fontWeight: '700' },
  small: { color: '#666' },
  row: { flexDirection: 'row', marginTop: 12 },
  btn: { backgroundColor: '#1976D2', padding: 10, marginHorizontal: 6, borderRadius: 8 },
  btnText: { color: 'white' }
});
