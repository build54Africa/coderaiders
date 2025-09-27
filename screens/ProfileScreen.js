// ProfileScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { UserContext } from '../UserContext';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout } = useContext(UserContext);

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
        <View style={styles.body}>
          <Text style={[styles.text, darkMode && styles.textDark]}>
            No user logged in
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <View style={styles.headerRow}>
        <Text style={[styles.header, darkMode && styles.textDark]}>Profile</Text>
        <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
          <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <Path
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              stroke={darkMode ? '#fff' : '#000'}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={[styles.text, darkMode && styles.textDark]}>
          Hello, {user.username} 👋
        </Text>
        <Text style={[styles.text, darkMode && styles.textDark]}>
          Role: {user.role}
        </Text>

        <View style={{ marginTop: 20, width: '60%' }}>
          <Button title="Logout" onPress={() => logout()} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  containerDark: { backgroundColor: '#121212' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18, color: '#000' },
  textDark: { color: '#fff' },
});
