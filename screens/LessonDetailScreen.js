// screens/LessonDetailScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { callAI } from "../services/ai";

export default function LessonDetailScreen({ route, navigation }) {
  const { lesson } = route.params;
  const [language, setLanguage] = useState("en"); // 🌐 Default language
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "sw" : "en");
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setConversation((prev) => [...prev, { sender: "You", text: message }]);

    try {
      const aiReply = await callAI(message);
      setConversation((prev) => [...prev, { sender: "AI", text: aiReply }]);
    } catch (err) {
      setConversation((prev) => [
        ...prev,
        { sender: "AI", text: "⚠️ Error contacting AI proxy." },
      ]);
    }

    setMessage("");
  };

  // Hardcoded Swahili translations for your lessons
  const contentSwahili = {
    "1": `Kilimo: Kukuza Chakula kwa Wote

Kilimo ni jinsi watu wanavyopanda chakula na kuhudumia wanyama. Wakulima wanapanda mbegu ili kukuza mazao kama mahindi, maharagwe, mchele, na mboga. Mazao haya yanatupa chakula tunachokula kila siku...`,
    "2": `Ufundi wa Mbao: Kujenga kwa Mbao

Ufundi wa mbao ni kazi ya kutengeneza vitu kwa kutumia mbao. Mtu anayefanya kazi hii huitwa fundi mbao. Wanafundi hujenga nyumba, meza, viti, milango, na vitu vingine...`,
    "3": `Ubunifu wa Maji: Kuleta Maji Nyumbani

Ubungaji wa bomba ni kazi ya kusafirisha maji ndani na nje ya majengo. Mtu anayefanya kazi hii huitwa fundi mabomba. Wanafundi wanasaidia kupata maji safi ya kunywa, kuosha, kupika, na kusafisha...`,
    "4": `Umeme: Nguvu kwa Maisha Yetu

Umeme ni nguvu inayowasha taa, TV, friji, na simu. Unatusaidia kupika chakula, kudumisha nyumba zetu kuwa na joto au baridi, na kutumia mashine...`,
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        {/* Scrollable lesson content */}
        <ScrollView style={styles.scroll}>
          {/* YouTube Video */}
          <View style={styles.videoContainer}>
            <WebView
              style={styles.video}
              javaScriptEnabled
              domStorageEnabled
              source={{ uri: `https://www.youtube.com/embed/${lesson.videoId}` }}
            />
          </View>

          {/* Lesson Title & Language Toggle */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>{lesson.title}</Text>
            <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
              <Text style={styles.langButtonText}>
                {language === "en" ? "🇰🇪 Swahili" : "🇬🇧 English"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lesson Description */}
          <Text style={styles.description}>{lesson.description}</Text>

          {/* Lesson Content */}
          <Text style={styles.content}>
            {language === "en"
              ? lesson.content
              : contentSwahili[lesson.id] || lesson.content}
          </Text>

          {/* Conversation history */}
          <View style={styles.chatContainer}>
            {conversation.map((msg, idx) => (
              <Text
                key={idx}
                style={msg.sender === "You" ? styles.userMsg : styles.aiMsg}
              >
                {msg.sender}: {msg.text}
              </Text>
            ))}
          </View>
        </ScrollView>

        {/* Input for AI conversation */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask the AI something..."
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  backButton: { position: "absolute", top: 20, left: 10, zIndex: 10 },
  backText: { fontSize: 30, color: "#007aff" },
  scroll: { flex: 1, padding: 20, marginTop: 40 },
  videoContainer: {
    width: "100%",
    height: 220,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  video: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  langButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  langButtonText: { color: "#fff", fontWeight: "600" },
  title: { fontSize: 22, fontWeight: "bold" },
  description: { fontSize: 16, marginTop: 10, color: "#444" },
  content: { fontSize: 16, marginTop: 10, lineHeight: 22, color: "#333" },
  chatContainer: { marginTop: 20 },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#007aff20",
    padding: 8,
    borderRadius: 6,
    marginVertical: 4,
  },
  aiMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea",
    padding: 8,
    borderRadius: 6,
    marginVertical: 4,
  },
  inputContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#007aff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendText: { color: "#fff", fontWeight: "bold" },
});
