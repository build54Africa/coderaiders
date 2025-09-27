// screens/DashboardScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useLessonContext } from '../LessonContext';

export default function DashboardScreen() {
  const { viewedLessons } = useLessonContext();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={[styles.header, darkMode && styles.textDark]}>Dashboard</Text>
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

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, darkMode && styles.textDark]}>Recently Viewed Lessons</Text>

        {viewedLessons.length === 0 ? (
          <Text style={[styles.empty, darkMode && styles.textDarkSub]}>No lessons viewed yet.</Text>
        ) : (
          viewedLessons.map((lesson) => (
            <View key={lesson.id} style={[styles.lessonCard, darkMode && styles.lessonCardDark]}>
              <Text style={[styles.lessonTitle, darkMode && styles.textDark]}>{lesson.title}</Text>
              <Text style={[styles.lessonDescription, darkMode && styles.textDarkSub]}>
                {lesson.description}
              </Text>
              <Text style={styles.lessonDuration}>{lesson.duration}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  containerDark: { backgroundColor: '#121212' },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: { fontSize: 22, fontWeight: 'bold', color: '#000' },

  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  empty: { color: '#888', fontStyle: 'italic' },

  lessonCard: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  lessonCardDark: { backgroundColor: '#1e1e1e' },

  lessonTitle: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  lessonDescription: { fontSize: 14, color: '#555' },
  lessonDuration: { fontSize: 13, color: '#007aff', marginTop: 4 },

  textDark: { color: '#fff' },
  textDarkSub: { color: '#bbb' },
});
