import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ThemeStore = {
    theme: "light" | "dark";
    toggleTheme: () => void;
};

const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches;

            return {
                theme: prefersDark ? "dark" : "light",
                toggleTheme: () =>
                    set((state) => ({
                        theme: state.theme === "light" ? "dark" : "light",
                    })),
            };
        },
        {
            name: "theme-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useThemeStore;
