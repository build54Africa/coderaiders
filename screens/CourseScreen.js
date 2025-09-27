// screens/CourseScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLessonContext } from '../LessonContext';
import { lessons } from '../lessons';  // ✅ Import lessons

export default function CourseScreen({ navigation }) {
  const { addLesson } = useLessonContext();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        addLesson(item); // save to context
        navigation.navigate('LessonDetail', { lesson: item });
      }}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Courses</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', padding: 15 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginHorizontal: 15,
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  thumbnail: { width: 100, height: 100 },
  textContainer: { flex: 1, padding: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  description: { color: '#444', marginTop: 4 },
  duration: { marginTop: 6, fontWeight: '600', color: '#007aff' },
});
