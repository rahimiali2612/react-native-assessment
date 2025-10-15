import React from "react";
import { TextInput, View, Text } from "react-native";

const Input = ({
  label,
  error,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "none",
  editable = true,
  ...props
}) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-700 font-semibold mb-2 text-base">
          {label}
        </Text>
      )}
      <TextInput
        className={`bg-white border-2 ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
        {...props}
      />
      {error && <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>}
    </View>
  );
};

export default Input;
