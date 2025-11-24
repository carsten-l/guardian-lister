import { WeatherMoonFilled, WeatherSunnyFilled } from "@fluentui/react-icons";
import useThemeStore from "../stores/ThemeStore";
import { Button } from "@fluentui/react-components";

export default function ThemeSwitcher() {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return (
        <Button
            shape="circular"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            size="large"
            icon={
                theme === "light" ? (
                    <WeatherMoonFilled />
                ) : (
                    <WeatherSunnyFilled />
                )
            }
        />
    );
}
