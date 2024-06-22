import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Help = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Articles");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerTitle: "Help",
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginRight: 5 }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const articlesData = [
    {
      id: "1",
      title: "How can i find or invite friends to Readify?",
      views: "140080",
      date: "Dec 12, 2023",
      type: "Knowledge",
    },
    {
      id: "2",
      title: "Where can i find my shelves on Readify?",
      views: "50975",
      date: "Nov 11, 2023",
      type: "Knowledge",
    },
  ];

  const questionsData = [
    {
      id: "1",
      title:
        "Why is my book is count for my reading challenge wrong? it says i have read 31 when i have only read 29. How can i fix this?",
      date: "2023 at 2:30 AM",
      views: "144",
      likes: "2",
      answers: "1",
    },
  ];

  const renderArticleItem = ({ item }) => (
    <View style={styles.articleItem}>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleInfo}>
        {item.views} Views · {item.date} · {item.type}
      </Text>
    </View>
  );

  const renderQuestionItem = ({ item }) => (
    <View style={styles.questionItem}>
      <Text style={styles.questionTitle}>{item.title}</Text>
      <View style={styles.questionInfo}>
        <Text style={styles.questionDate}>{item.date}</Text>
        <View style={styles.questionStats}>
          <Ionicons name="eye-outline" size={16} color="gray" />
          <Text style={styles.statText}>{item.views}</Text>
          <Ionicons name="thumbs-up-outline" size={16} color="gray" />
          <Text style={styles.statText}>{item.likes}</Text>
          <Ionicons name="chatbubble-outline" size={16} color="gray" />
          <Text style={styles.statText}>{item.answers}</Text>
          <Text style={styles.answeredTag}>Answered</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Android</Text>
      <TouchableOpacity style={styles.askButton}>
        <Text style={styles.askButtonText}>Ask a question</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contact us</Text>
      </TouchableOpacity>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Articles" && styles.activeTab]}
          onPress={() => setActiveTab("Articles")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Articles" && styles.activeTabText,
            ]}
          >
            Articles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Questions" && styles.activeTab]}
          onPress={() => setActiveTab("Questions")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Questions" && styles.activeTabText,
            ]}
          >
            Questions & A...
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "Articles" ? (
        <FlatList
          data={articlesData}
          renderItem={renderArticleItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={questionsData}
          renderItem={renderQuestionItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  askButton: {
    backgroundColor: "#8B4513",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  askButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  contactButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#8B4513",
  },
  contactButtonText: {
    color: "#8B4513",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#8B4513",
  },
  tabText: {
    fontSize: 16,
    color: "gray",
  },
  activeTabText: {
    color: "#8B4513",
    fontWeight: "bold",
  },
  articleItem: {
    marginBottom: 20,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  articleInfo: {
    fontSize: 14,
    color: "gray",
  },
  questionItem: {
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  questionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionDate: {
    fontSize: 14,
    color: "gray",
  },
  questionStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
    marginRight: 10,
  },
  answeredTag: {
    backgroundColor: "green",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 12,
  },
});

export default Help;
