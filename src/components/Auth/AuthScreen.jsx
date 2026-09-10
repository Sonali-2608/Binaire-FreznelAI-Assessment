import { useState } from "react";
import { Form, TextField, Button, Heading, Text, View, ButtonGroup } from "@adobe/react-spectrum";
import { signUp, logIn } from "../../auth/firebase";

export default function AuthScreen() {
  const [mode, setMode] = useState("login"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const action = mode === "signup" ? signUp(email, password) : logIn(email, password);

    action
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <View
      UNSAFE_className="fade-in"
      maxWidth="size-4600"
      margin="size-800"
      marginX="auto"
      padding="size-400"
      borderWidth="thin"
      borderColor="dark"
      borderRadius="medium"
    >
      <Heading level={2}>{mode === "signup" ? "Create an account" : "Log in"}</Heading>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          isRequired
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          isRequired
        />
        {error && <Text UNSAFE_style={{ color: "var(--spectrum-global-color-red-600)" }}>{error}</Text>}
        <ButtonGroup>
          <Button variant="cta" type="submit" isDisabled={submitting}>
            {mode === "signup" ? "Sign up" : "Log in"}
          </Button>
          <Button
            variant="secondary"
            onPress={() => setMode(mode === "signup" ? "login" : "signup")}
          >
            {mode === "signup" ? "Have an account? Log in" : "New here? Sign up"}
          </Button>
        </ButtonGroup>
      </Form>
    </View>
  );
}
