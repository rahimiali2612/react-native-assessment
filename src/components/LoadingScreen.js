import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <View className="flex-1 bg-blue-50 items-center justify-center">
      <ActivityIndicator size="large" color="#2563EB" />
      <Text className="text-gray-600 text-base mt-4">{message}</Text>
    </View>
  );
};

export default LoadingScreen;
