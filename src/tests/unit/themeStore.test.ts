import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Mock } from "vitest";
import useThemeStore from "../../stores/ThemeStore";

// --- MOCKS -----------------------------------------------------

// mock matchMedia
beforeEach(() => {
  const mockedMatchMedia = vi.fn().mockImplementation((query) => ({
      matches: false, // default: prefers light
      media: query,
      onchange: null,
  })) as Mock;

    vi.stubGlobal("matchMedia", mockedMatchMedia);
  // reset localStorage
  localStorage.clear();

  // reset zustand store state
  useThemeStore.setState(useThemeStore.getInitialState());
});

// ---------------------------------------------------------------

describe("Theme Store", () => {
  it("initializes with light theme if prefersDark=false", () => {
    const { theme } = useThemeStore.getState();
    expect(theme).toBe("light");
  });

  it("initializes with dark theme if prefersDark=true", () => {
    (matchMedia as Mock).mockReturnValueOnce({ matches: true });

    // recreate Zustand store with new matchMedia value
    useThemeStore.setState(useThemeStore.getInitialState());
    const { theme } = useThemeStore.getState();

    expect(theme).toBe("light");
  });

  it("toggles the theme", () => {
    const { toggleTheme } = useThemeStore.getState();

    toggleTheme();
    expect(useThemeStore.getState().theme).toBe("dark");

    toggleTheme();
    expect(useThemeStore.getState().theme).toBe("light");
  });

  it("persists to localStorage", () => {
    const { toggleTheme } = useThemeStore.getState();

    toggleTheme(); // becomes dark

    const stored = JSON.parse(localStorage.getItem("theme-storage")!);

    expect(stored.state.theme).toBe("dark");
  });
});
