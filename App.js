import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 bg-blue-500 items-center justify-center">
      <View className="bg-white p-8 rounded-2xl shadow-lg">
        <Text className="text-3xl font-bold text-blue-600 mb-4">
          NativeWind Test
        </Text>
        <Text className="text-gray-700 text-center mb-2">
          🎨 Tailwind CSS is working!
        </Text>
        <Text className="text-sm text-gray-500 text-center">
          If you see styled text, NativeWind is configured correctly.
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
