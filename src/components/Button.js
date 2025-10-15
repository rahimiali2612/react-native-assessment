import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";

const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  fullWidth = true,
  ...props
}) => {
  const baseClasses = "rounded-xl py-4 px-6 items-center justify-center";

  const variantClasses = {
    primary: "bg-blue-600 active:bg-blue-700",
    secondary: "bg-gray-200 active:bg-gray-300",
    outline: "bg-transparent border-2 border-blue-600",
    danger: "bg-red-600 active:bg-red-700",
  };

  const textClasses = {
    primary: "text-white",
    secondary: "text-gray-800",
    outline: "text-blue-600",
    danger: "text-white",
  };

  const disabledClasses = disabled || loading ? "opacity-50" : "";
  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${widthClasses}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "secondary" ? "#1F2937" : "#FFFFFF"}
        />
      ) : (
        <Text className={`${textClasses[variant]} font-bold text-lg`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
