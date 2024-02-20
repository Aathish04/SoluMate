import React from "react";
import { TextInput } from "react-native";

function MyTextInput({ value, onChange, placeholder }) {
  return (
    <TextInput
      style={{
        borderWidth: 1.5,
        borderColor: "white",
        borderRadius: 10,
        padding: 10,
        margin: 15,
        color: "black",
        backgroundColor: 'white' // Set text color to white
 
      }}
      value={value}
      placeholder={placeholder}
      onChangeText={(e) => {
        onChange(e);
      }}
    />
  );
}

export default MyTextInput;
