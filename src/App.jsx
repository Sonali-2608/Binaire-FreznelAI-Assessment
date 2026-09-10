import { useEffect, useState } from "react";
import { Provider, defaultTheme, Flex, ProgressCircle } from "@adobe/react-spectrum";
import AuthScreen from "./components/Auth/AuthScreen";
import ExplorerPage from "./pages/ExplorerPage";
import { listenToAuthState } from "./auth/firebase";
import "./styles/transitions.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToAuthState((firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  return (
    <Provider theme={defaultTheme}>
      <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
        {checkingAuth ? (
          <Flex justifyContent="center" marginTop="size-800">
            <ProgressCircle isIndeterminate aria-label="Checking sign-in state" />
          </Flex>
        ) : user ? (
          <ExplorerPage key="explorer" />
        ) : (
          <AuthScreen key="auth" />
        )}
      </div>
    </Provider>
  );
}
