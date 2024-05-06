import ChatMessageBox from "../../components/ChatMessageBox";
import ReplyMessageBar from "../../components/ReplyMessageBar";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
  IMessage,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import messageData from "../../assets/data/messages.json";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Notification from "../../components/Notification";

const Page = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);

  useEffect(() => {
    setMessages([
      ...messageData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? "You" : "Bob",
          },
        };
      }),
      {
        _id: 0,
        system: true,
        text: "All your base are belong to us",
        createdAt: new Date(),
        user: {
          _id: 0,
          name: "Bot",
        },
      },
    ]);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "chat",
      headerTitleStyle: { color: "#fff" }, // Use your preferred color code

      headerLeft: () => (
        <View style={{ borderRadius: 50, overflow: "hidden", marginRight: 10 }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              height: 25, // Adjust the size as needed
              width: 25, // Adjust the size as needed
              borderRadius: 50, // Make it circular
              justifyContent: "center",
              alignItems: "center",
            }}
            android_ripple={{ color: "#DDD" }}
          >
            <Ionicons name="chevron-back" size={24} color={"#FFF"} />
          </Pressable>
        </View>
      ),
      headerStyle: { backgroundColor: "#A56635", color: "white" },
      headerRight: () => <Notification />,
    });
  }, [navigation]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any[]) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: "#F5E9E0" }}
        renderActions={() => (
          <View
            style={{
              height: 44,
              justifyContent: "center",
              alignItems: "center",
              left: 5,
            }}
          >
            <Ionicons name="add" color={"#A56635"} size={28} />
          </View>
        )}
      />
    );
  };

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  return (
    <ImageBackground
      source={require("../../assets/images/pattern.png")}
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        marginBottom: insets.bottom,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        onInputTextChanged={setText}
        user={{
          _id: 1,
        }}
        renderSystemMessage={(props) => (
          <SystemMessage {...props} textStyle={{ color: "#FAF4EF" }} />
        )}
        bottomOffset={insets.bottom}
        renderAvatar={null}
        maxComposerHeight={100}
        textInputProps={styles.composer}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "#000",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#fff",
                },
                right: {
                  backgroundColor: "#F5E9E0",
                },
              }}
            />
          );
        }}
        renderSend={(props) => (
          <View
            style={{
              height: 44,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              paddingHorizontal: 14,
            }}
          >
            {text === "" && (
              <>
                <Ionicons name="camera-outline" color={"#A56635"} size={28} />
                <Ionicons name="mic-outline" color={"#A56635"} size={28} />
              </>
            )}
            {text !== "" && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: "center",
                }}
              >
                <Ionicons name="send" color={"#A56635"} size={28} />
              </Send>
            )}
          </View>
        )}
        renderInputToolbar={renderInputToolbar}
        renderChatFooter={() => (
          <ReplyMessageBar
            clearReply={() => setReplyMessage(null)}
            message={replyMessage}
          />
        )}
        onLongPress={(context, message) => setReplyMessage(message)}
        renderMessage={(props) => (
          <ChatMessageBox
            {...props}
            setReplyOnSwipeOpen={setReplyMessage}
            updateRowRef={updateRowRef}
          />
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  composer: {
    backgroundColor: "#FAF4EF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E0BCA1",
    paddingHorizontal: 10,
    // paddingTop: 8,
    fontSize: 16,
    marginVertical: 4,
  },
});

export default Page;
