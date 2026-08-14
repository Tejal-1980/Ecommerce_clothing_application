import {
  createContext,
  useState,
} from "react";

export const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      return {
        username: savedUser,
      };
    }
  });

  const login = (userData) => {
    const userObject =
      typeof userData === "string"
        ? {
          username: userData,
        }
        : userData;

    localStorage.setItem(
      "user",
      JSON.stringify(userObject)
    );

    setUser(userObject);
  };

  const logout = () => {
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}