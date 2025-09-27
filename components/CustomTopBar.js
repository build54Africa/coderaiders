// CustomTopBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../ThemeContext';

// Dark mode icon
const darkModeIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>`;

export default function CustomTopBar({ title }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: darkMode ? '#222' : '#fff' }}>
      <View style={styles.bar}>
        {/* Dark mode toggle */}
        <TouchableOpacity onPress={toggleDarkMode} style={styles.iconButton}>
          <SvgXml xml={darkModeIcon} width="26" height="26" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={[styles.title, { color: darkMode ? '#fff' : '#000' }]}>{title}</Text>

        {/* Spacer to center title */}
        <View style={styles.spacer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  iconButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  spacer: {
    width: 30,
  },
});
