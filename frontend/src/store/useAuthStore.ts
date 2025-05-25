import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface AuthStore {
  user: User | null; // Replace `any` with your actual `User` type if you have it
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  profile: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      loading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              query: `
                      query GetUserByToken($email: String!, $password: String!) {
                        getUserByToken(email: $email, password: $password)
                       }
                      `,
              variables: {
                email,
                password,
              },
            }),
          });
          const json = await response.json();
          const token = json.data.getUserByToken;
          if (!token) {
            throw new Error("Invalid token");
          }

          set({ token, isLoggedIn: true, loading: false });
          localStorage.setItem("token", token);
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null, isLoggedIn: false });
        localStorage.removeItem("token");
      },

      profile: async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token not Found!");
        }
        try {
          const response = await fetch(`${import.meta.env.VITE_GRAPHQL_URL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },

            body: JSON.stringify({
              query: `
                        query GetCurrentLoggedInUser{
                            getCurrentLoggedInUser{
                                id
                                name
                                email
                                image
                            }
                        }
                    `,
            }),
          });

          const json = await response.json();
          const currentUser = json.data.getCurrentLoggedInUser;
          set({ user: {...currentUser, image: currentUser.image || ''} });
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
