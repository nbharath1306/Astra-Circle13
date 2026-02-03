import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Analytics() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>SYSTEM ANALYTICS</Text>
            <View style={styles.statBox}>
                <Text style={styles.statValue}>100%</Text>
                <Text style={styles.statLabel}>SYSTEM INTEGRITY</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    header: {
        color: '#555',
        fontSize: 12,
        letterSpacing: 2,
        marginBottom: 40,
    },
    statBox: {
        alignItems: 'center',
        marginBottom: 30,
    },
    statValue: {
        color: '#0F0',
        fontSize: 32,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#555',
        fontSize: 10,
        marginTop: 5,
    },
});
