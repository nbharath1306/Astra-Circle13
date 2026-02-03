import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

export default function MissionLog() {
    const logs = [
        { id: '1', time: '10:00', content: 'System initialized. Agent swarm online.', type: 'info' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>MISSION LOG</Text>
            <FlatList
                data={logs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.logItem}>
                        <Text style={styles.logTime}>{item.time}</Text>
                        <Text style={styles.logContent}>{item.content}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
        paddingTop: 60,
    },
    header: {
        color: '#555',
        fontSize: 12,
        letterSpacing: 2,
        marginBottom: 20,
    },
    logItem: {
        flexDirection: 'row',
        marginBottom: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#333',
        paddingLeft: 10,
    },
    logTime: {
        color: '#555',
        fontSize: 12,
        width: 50,
        marginRight: 10,
        fontFamily: 'monospace',
    },
    logContent: {
        color: '#CCC',
        fontSize: 14,
        flex: 1,
    },
});
