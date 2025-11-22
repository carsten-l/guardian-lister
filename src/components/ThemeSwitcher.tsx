import { IoMoon, IoSunny } from "react-icons/io5";
import useThemeStore from "../stores/ThemeStore";

export default function ThemeSwitcher() {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return (
        <button
            className={`p-2 rounded-full flex justify-center items-center ${theme === "light" ? "bg-gray-200" : "bg-gray-600"}`}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
        >
            {theme === "light" ? (
                <IoMoon size="1.5em" />
            ) : (
                <IoSunny size="1.5em" />
            )}
        </button>
    );
}
