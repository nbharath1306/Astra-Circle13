import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import React from 'react';

export default function HUD() {
  const compliance = useQuery(api.queries.compliance.getCompliance);
  // Placeholder for agent interaction
  // const analyze = useMutation(api.mutations.logAgent.logInteraction);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BIOLOGICAL GOVERNANCE</Text>
      <View style={styles.ringContainer}>
        <Text style={styles.score}>{compliance?.score ?? 100}%</Text>
        <Text style={styles.label}>COMPLIANCE</Text>
      </View>

      <Pressable style={styles.button} onPress={() => alert('Analyzing...')}>
        <Text style={styles.buttonText}>CAPTURE BIOMATTER</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#555',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 40,
  },
  ringContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  score: {
    color: '#0F0',
    fontSize: 48,
    fontWeight: 'bold',
  },
  label: {
    color: '#0F0',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#111',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    letterSpacing: 1,
  },
});
