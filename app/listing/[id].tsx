import { StyleSheet, Text, View, TouchableOpacity, Share } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,

      // headerBackground: () => (
      //   <View
      //     style={[headerAnimatedStyle, styles.header]}
      //   ></View>
      // ),
      // headerRight: () => (
      //   <View style={styles.bar}>
      //     <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
      //       <Ionicons name="share-outline" size={22} color={"#000"} />
      //     </TouchableOpacity>
      //     <TouchableOpacity style={styles.roundButton}>
      //       <Ionicons name="heart-outline" size={22} color={"#000"} />
      //     </TouchableOpacity>
      //   </View>
      // ),
      // headerLeft: () => (
      //   <TouchableOpacity
      //     style={styles.roundButton}
      //     onPress={() => navigation.goBack()}
      //   >
      //     <Ionicons name="chevron-back" size={24} color={"#000"} />
      //   </TouchableOpacity>
      // ),
    });
  }, []);
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({});
