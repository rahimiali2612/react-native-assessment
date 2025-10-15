import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const result = await logout();

              if (result.success) {
                console.log("Logout successful");
              }
            } catch (error) {
              Alert.alert("Error", "Failed to logout");
              console.error("Logout error:", error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View className="flex-1 bg-blue-50">
      <ScrollView
        contentContainerClassName="flex-grow"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pt-8 pb-8">
          {/* Header */}
          <View className="mb-8">
            <Text className="mb-2 text-3xl font-bold text-gray-800">
              Welcome Back! 🎉
            </Text>
            <Text className="text-lg text-gray-600">
              Here's your profile information
            </Text>
          </View>

          {/* User Profile Card */}
          <View className="p-6 mb-6 bg-white shadow-lg rounded-3xl">
            {/* Avatar */}
            <View className="items-center mb-6">
              <View className="items-center justify-center w-24 h-24 mb-3 bg-blue-600 rounded-full">
                <Text className="text-4xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase() || "?"}
                </Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800">
                {user?.name || "Guest User"}
              </Text>
            </View>

            {/* User Details */}
            <View className="space-y-4">
              <View className="p-4 bg-blue-50 rounded-xl">
                <Text className="mb-1 text-sm font-semibold text-gray-500">
                  Email Address
                </Text>
                <Text className="text-base font-medium text-gray-800">
                  {user?.email || "N/A"}
                </Text>
              </View>

              <View className="p-4 mt-3 bg-blue-50 rounded-xl">
                <Text className="mb-1 text-sm font-semibold text-gray-500">
                  Member Since
                </Text>
                <Text className="text-base font-medium text-gray-800">
                  {formatDate(user?.created_at)}
                </Text>
              </View>

              <View className="p-4 mt-3 bg-blue-50 rounded-xl">
                <Text className="mb-1 text-sm font-semibold text-gray-500">
                  User ID
                </Text>
                <Text className="text-base font-medium text-gray-800">
                  #{user?.id || "N/A"}
                </Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <View className="mt-6">
            <Button
              title="Logout"
              onPress={handleLogout}
              loading={loading}
              variant="danger"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
