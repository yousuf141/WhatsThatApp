import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

interface FormInputProps {
  label?: string | undefined;
  left?: React.ReactNode;
  value?: string | undefined;
  secureTextEntry?: boolean | undefined;
  onChangeText?: (((text: string) => void) & Function) | undefined;
  error?: boolean | undefined;
  errorMessage?: string | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  left,
  value,
  secureTextEntry,
  onChangeText,
  error,
  errorMessage,
}) => {
  function renderErrorMessage() {
    if (error) return <HelperText type="error">{errorMessage}</HelperText>;
  }

  return (
    <View>
      <TextInput
        label={label}
        left={left}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        error={error}
      />
      {renderErrorMessage()}
    </View>
  );
};

export default FormInput;
