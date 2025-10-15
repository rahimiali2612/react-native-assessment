import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context/AuthContext";
import { signupSchema } from "../utils/validationSchemas";
import Input from "../components/Input";
import Button from "../components/Button";

const SignupScreen = ({ navigation }) => {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await signup(data);

      if (result.success) {
        Alert.alert("Success", result.message, [
          {
            text: "OK",
            onPress: () => {
              // Navigation will be handled automatically by the navigation structure
              console.log("Signup successful");
            },
          },
        ]);
      } else {
        Alert.alert("Signup Failed", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-blue-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6 py-8">
            {/* Header */}
            <View className="mb-8">
              <Text className="mb-2 text-4xl font-bold text-gray-800">
                Create Account 🚀
              </Text>
              <Text className="text-lg text-gray-600">
                Sign up to get started
              </Text>
            </View>

            {/* Signup Form */}
            <View className="p-6 mb-6 bg-white shadow-lg rounded-3xl">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    value={value}
                    onChangeText={onChange}
                    error={errors.name?.message}
                    autoCapitalize="words"
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Input
                      label="Password"
                      placeholder="Create a password (min 6 characters)"
                      value={value}
                      onChangeText={onChange}
                      error={errors.password?.message}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-12"
                    >
                      <Text className="font-semibold text-blue-600">
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Input
                      label="Confirm Password"
                      placeholder="Re-enter your password"
                      value={value}
                      onChangeText={onChange}
                      error={errors.confirmPassword?.message}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-12"
                    >
                      <Text className="font-semibold text-blue-600">
                        {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />

              <Button
                title="Create Account"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                variant="primary"
              />
            </View>

            {/* Login Link */}
            <View className="flex-row items-center justify-center">
              <Text className="text-base text-gray-600">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-base font-bold text-blue-600">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;
