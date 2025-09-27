// LessonContext.js
import React, { createContext, useState, useContext } from 'react';

const LessonContext = createContext();

export function LessonProvider({ children }) {
  const [viewedLessons, setViewedLessons] = useState([]);

  const addLesson = (lesson) => {
    setViewedLessons((prev) => {
      if (prev.find((l) => l.id === lesson.id)) {
        return prev; // avoid duplicates
      }
      return [...prev, lesson];
    });
  };

  return (
    <LessonContext.Provider value={{ viewedLessons, addLesson }}>
      {children}
    </LessonContext.Provider>
  );
}

export function useLessonContext() {
  return useContext(LessonContext);
}
