"use client";

import { account } from "@/lib/appwrite";
import { ID, OAuthProvider } from "appwrite";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type Session = {
  userId: string;
  provider: string;
};

const UserContext = createContext<{
  current: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}>({
  current: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export function useUser() {
  return useContext(UserContext);
}

export function AuthProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<Session | null>(null);
  const router = useRouter();

  async function login(email: string, password: string) {
    const loggedIn: Session = await account.createEmailPasswordSession(
      email,
      password,
    );
    setUser(loggedIn);
    window.location.replace("/dashboard");
  }

  async function loginWithGoogle() {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    );
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    router.push("/");
  }

  async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = (await account.get()) as unknown as Session;
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: user, login, logout, register, loginWithGoogle }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
