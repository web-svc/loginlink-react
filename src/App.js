import { useEffect, useState } from "react";
import { init, login, getAuthCodeFromUrl } from "loginlink-js";
import Modal from "./Modal";

export default function App() {
  const [modal, setModal] = useState(null);

  const clearQueryParams = () => {
    const url = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, url);
  };

  useEffect(() => {
    init({
      clientId: "xx",
      redirectUri: "http://localhost:3000/callback",
    });

    // Always check for error/callback params on page load
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const error_description = params.get("error_description");

    if (error) {
      setModal({
        type: "error",
        title: "Login Error",
        message: `${error}\n${error_description}`
      });
      return;
    }

    // Handle /callback
    if (window.location.pathname === "/callback") {
      const { code, state, error, error_description } = getAuthCodeFromUrl();

      if (error) {
        setModal({
          type: "error",
          title: "Login Error",
          message: `${error}\n${error_description}`
        });
        return;
      }

      if (code && state) {
        setModal({
          type: "success",
          title: "Login Successful",
          message: `Code: ${code}\nState: ${state}`
        });
      }
    }
  }, []);

  const handleCloseModal = () => {
    setModal(null);
    clearQueryParams();
  };

  const handleLogin = () => {
    login();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>LoginLink React Sample</h1>
      <button onClick={handleLogin}>Login with LoginLink</button>

      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
