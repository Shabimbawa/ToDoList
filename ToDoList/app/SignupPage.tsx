import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");

  const handleSignUp = async () => {
    setMessage("");
    setMessageType("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setMessage("Please fill out all fields.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(
        `https://todo-list.dcism.org/signup_action.php/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            confirm_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.status !== 200) {
        if (data.message?.toLowerCase().includes("email")) {
          setMessage("Email already exists.");
        } else {
          setMessage(data.message || "Failed to sign up.");
        }
        setMessageType("error");
        return;
      }

      setMessage("Account created successfully.");
      setMessageType("success");

      setTimeout(() => {
        router.replace("/LoginPage");
      }, 1500);
    } catch (error: any) {
      console.error("Signup Error:", error);
      setMessage(error.message || "Failed to sign up.");
      setMessageType("error");
    }
  };

  const goToLogin = () => {
    router.replace("/LoginPage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {message !== "" && (
        <Text
          style={
            messageType === "error" ? styles.errorText : styles.successText
          }
        >
          {message}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        {" "}
        {/* Use the same style name as LoginPage for consistency */}
        Already have an account?{" "}
        <Pressable onPress={goToLogin}>
          <Text style={styles.link}>Log In</Text>
        </Pressable>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  footer: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
  },
  link: {
    color: "#007aff",
    fontWeight: "bold",
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 24,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  successText: {
    color: "green",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default SignUp;
