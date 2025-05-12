"use client";

import { useLogin, useSignup } from "@/hooks/useAuth";
import { useGetUser } from "@/hooks/useUser";
import { LoginRequest, SignupRequest } from "@/service/auth/auth.types";
import { UserResponse } from "@/service/user/user.types";
import { clearBasicAuth, setBasicAuth } from "@/utils/setBasicAuth";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextValue } from "./AuthContext.types";
import { LS_USER } from "./constants";

export const AppContext = createContext<AuthContextValue>(null);

export const useAuthContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("You can only call this hook inside AuthContextProvider");
  }
  return context;
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const { data: updatedUser } = useGetUser(user?.id || "");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem(LS_USER);

    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUser(user);
      setBasicAuth(user.username, user.password);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (updatedUser && user?.password) {
      const authUser = { ...updatedUser, password: user?.password };
      setUser(authUser);
    }
  }, [updatedUser]);

  const signup = async (data: SignupRequest) => {
    await signupMutation.mutateAsync(data);
    await login({ username: data.username, password: data.password });
  };

  const login = async (data: LoginRequest) => {
    const loggedInUser = await loginMutation.mutateAsync(data);
    const authUser = { ...loggedInUser, password: data.password };
    setUser(authUser);
    localStorage.setItem(LS_USER, JSON.stringify(authUser));
    setBasicAuth(authUser.username, authUser.password);
  };

  const logout = () => {
    setUser(null);
    clearBasicAuth();
    localStorage.removeItem(LS_USER);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        initialized,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AuthContextProvider;
