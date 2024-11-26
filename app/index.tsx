import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import jsSHA from "jssha";

// Type for form data
interface FormData {
  username: string;
  password: string;
  confirmPassword?: string;
}

// Main LoginScreen Component
export default function LoginScreen() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Basic form validation
  const validateForm = () => {
    const { username, password, confirmPassword } = formData;
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all required fields.");
      return false;
    }
    if (isSignUp && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    var data = new FormData();
    data.append("username", formData.username);

    const hash = new jsSHA("SHA-384", "TEXT");
    hash.update(formData.password);
    var hashedPass = hash.getHash("HEX");
    data.append("password", hashedPass);

    if (!validateForm()) return;

    if (isSignUp) {
      fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: data,
      }).then((resp) => {
        if (resp.ok) {
          router.replace("/(main)/");
        }
      });
    } else {
      fetch("http://localhost:5000/api/login", {
        method: "POST",
        body: data,
      }).then((resp) => {
        if (resp.ok) {
          router.replace("/(main)/");
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleInputChange("username", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleInputChange("password", text)}
      />

      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchModeButton}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        <Text style={styles.switchModeText}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don’t have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchModeButton: {
    marginTop: 20,
  },
  switchModeText: {
    color: "#007bff",
    fontSize: 14,
  },
});
